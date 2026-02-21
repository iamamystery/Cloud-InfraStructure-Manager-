import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/resources - Get all resources for organization
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No token provided' } },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const cloudProviderId = searchParams.get('cloudProviderId');
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {
      organizationId: decoded.organizationId,
      deletedAt: null,
    };

    if (type) where.type = type;
    if (status) where.status = status;
    if (cloudProviderId) where.cloudProviderId = cloudProviderId;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Get total count
    const total = await prisma.resource.count({ where });

    // Get resources
    const resources = await prisma.resource.findMany({
      where,
      include: {
        cloudProvider: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        environment: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: resources,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get resources error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// POST /api/resources - Create new resource
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'No token provided' } },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const body = await request.json();

    // Check organization limits
    const organization = await prisma.organization.findUnique({
      where: { id: decoded.organizationId },
      include: {
        _count: {
          select: { resources: true },
        },
      },
    });

    if (!organization) {
      return NextResponse.json(
        { success: false, error: { code: 'ORGANIZATION_NOT_FOUND', message: 'Organization not found' } },
        { status: 404 }
      );
    }

    if (organization._count.resources >= organization.maxResources) {
      return NextResponse.json(
        { success: false, error: { code: 'LIMIT_EXCEEDED', message: 'Resource limit exceeded for your plan' } },
        { status: 403 }
      );
    }

    // Create resource
    const resource = await prisma.resource.create({
      data: {
        organizationId: decoded.organizationId,
        projectId: body.projectId,
        environmentId: body.environmentId,
        cloudProviderId: body.cloudProviderId,
        name: body.name,
        type: body.type,
        region: body.region,
        zone: body.zone,
        specifications: body.specifications || {},
        tags: body.tags || [],
        labels: body.labels || {},
        config: body.config || {},
        networking: body.networking || {},
        estimatedMonthlyCost: body.estimatedMonthlyCost,
      },
      include: {
        cloudProvider: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        organizationId: decoded.organizationId,
        userId: decoded.userId,
        action: 'CREATE',
        entityType: 'RESOURCE',
        entityId: resource.id,
        newValues: resource,
      },
    });

    return NextResponse.json(
      { success: true, data: resource },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create resource error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
