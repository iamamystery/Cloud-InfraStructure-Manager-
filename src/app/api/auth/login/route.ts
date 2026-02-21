import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken, generateRefreshToken, TokenPayload } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } },
        { status: 401 }
      );
    }

    // Check if account is active
    if (user.accountStatus !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_INACTIVE', message: 'Account is not active' } },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password);

    if (!isValidPassword) {
      // Increment failed login attempts
      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: { increment: 1 } },
      });

      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } },
        { status: 401 }
      );
    }

    // Update last login and reset failed attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        failedLoginAttempts: 0,
      },
    });

    // Get primary organization
    const primaryMembership = user.memberships[0];
    const organizationId = primaryMembership?.organizationId;

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId,
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
        },
        organization: primaryMembership?.organization,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input data' } },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
