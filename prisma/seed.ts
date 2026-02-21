import { prisma } from '../src/lib/prisma';
import { hashPassword } from '../src/lib/auth';

async function main() {
  console.log('Start seeding...');

  // Create demo user
  const hashedPassword = await hashPassword('demo123456');
  
  const user = await prisma.user.create({
    data: {
      email: 'demo@cloudmanager.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      subscriptionTier: 'PRO',
      accountStatus: 'ACTIVE',
      emailVerified: true,
    },
  });

  console.log(`Created user: ${user.email}`);

  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Demo Organization',
      slug: 'demo-org',
      billingEmail: 'demo@cloudmanager.com',
      subscriptionTier: 'PRO',
      createdById: user.id,
    },
  });

  console.log(`Created organization: ${organization.name}`);

  // Create organization membership
  await prisma.organizationMember.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
      role: 'OWNER',
    },
  });

  // Create cloud providers
  const awsProvider = await prisma.cloudProvider.create({
    data: {
      organizationId: organization.id,
      name: 'AWS Production',
      type: 'AWS',
      status: 'CONNECTED',
      credentials: {},
      regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
      settings: {},
    },
  });

  const azureProvider = await prisma.cloudProvider.create({
    data: {
      organizationId: organization.id,
      name: 'Azure Development',
      type: 'AZURE',
      status: 'CONNECTED',
      credentials: {},
      regions: ['eastus', 'westeurope'],
      settings: {},
    },
  });

  const gcpProvider = await prisma.cloudProvider.create({
    data: {
      organizationId: organization.id,
      name: 'GCP Staging',
      type: 'GCP',
      status: 'CONNECTED',
      credentials: {},
      regions: ['us-central1', 'europe-west1'],
      settings: {},
    },
  });

  console.log('Created cloud providers');

  // Create project
  const project = await prisma.project.create({
    data: {
      organizationId: organization.id,
      name: 'Production Application',
      slug: 'production-app',
      description: 'Main production environment',
      status: 'ACTIVE',
    },
  });

  console.log(`Created project: ${project.name}`);

  // Create environments
  const productionEnv = await prisma.environment.create({
    data: {
      projectId: project.id,
      organizationId: organization.id,
      name: 'Production',
      type: 'PRODUCTION',
      description: 'Live production environment',
    },
  });

  const stagingEnv = await prisma.environment.create({
    data: {
      projectId: project.id,
      organizationId: organization.id,
      name: 'Staging',
      type: 'STAGING',
      description: 'Staging environment for testing',
    },
  });

  console.log('Created environments');

  // Create resources
  const resources = await prisma.resource.createMany({
    data: [
      {
        organizationId: organization.id,
        projectId: project.id,
        environmentId: productionEnv.id,
        cloudProviderId: awsProvider.id,
        name: 'web-server-prod-01',
        type: 'VIRTUAL_MACHINE',
        status: 'RUNNING',
        cloudResourceId: 'i-1234567890abcdef0',
        region: 'us-east-1',
        zone: 'us-east-1a',
        specifications: {
          instanceType: 't3.medium',
          vcpu: 2,
          memory: '4GB',
          storage: '50GB',
        },
        tags: ['production', 'web', 'frontend'],
        labels: { environment: 'production', service: 'web' },
        estimatedMonthlyCost: 145.50,
      },
      {
        organizationId: organization.id,
        projectId: project.id,
        environmentId: productionEnv.id,
        cloudProviderId: awsProvider.id,
        name: 'postgres-primary',
        type: 'DATABASE',
        status: 'RUNNING',
        cloudResourceId: 'db-1234567890',
        region: 'us-east-1',
        specifications: {
          engine: 'postgresql',
          version: '15.0',
          instanceClass: 'db.t3.medium',
          allocatedStorage: 100,
        },
        tags: ['production', 'database', 'postgres'],
        labels: { environment: 'production', service: 'database' },
        estimatedMonthlyCost: 89.20,
      },
      {
        organizationId: organization.id,
        projectId: project.id,
        environmentId: stagingEnv.id,
        cloudProviderId: azureProvider.id,
        name: 'api-gateway',
        type: 'SERVERLESS_FUNCTION',
        status: 'RUNNING',
        cloudResourceId: '/subscriptions/xxx/resourceGroups/xxx/providers/Microsoft.Web/sites/api-gateway',
        region: 'eastus',
        specifications: {
          runtime: 'node18',
          memory: '512MB',
          timeout: 30,
        },
        tags: ['staging', 'api', 'serverless'],
        labels: { environment: 'staging', service: 'api' },
        estimatedMonthlyCost: 45.00,
      },
      {
        organizationId: organization.id,
        projectId: project.id,
        environmentId: stagingEnv.id,
        cloudProviderId: gcpProvider.id,
        name: 'redis-cache',
        type: 'CACHE',
        status: 'STOPPED',
        cloudResourceId: 'projects/demo-project/locations/us-central1/instances/redis-cache',
        region: 'us-central1',
        specifications: {
          tier: 'basic',
          memorySizeGb: 2,
          redisVersion: '6.x',
        },
        tags: ['staging', 'cache', 'redis'],
        labels: { environment: 'staging', service: 'cache' },
        estimatedMonthlyCost: 25.00,
      },
      {
        organizationId: organization.id,
        projectId: project.id,
        environmentId: productionEnv.id,
        cloudProviderId: awsProvider.id,
        name: 'storage-bucket-assets',
        type: 'STORAGE_BUCKET',
        status: 'RUNNING',
        cloudResourceId: 'arn:aws:s3:::storage-bucket-assets',
        region: 'eu-west-1',
        specifications: {
          storageClass: 'STANDARD',
          versioning: true,
          encryption: 'AES256',
        },
        tags: ['production', 'storage', 'assets'],
        labels: { environment: 'production', service: 'storage' },
        estimatedMonthlyCost: 12.30,
      },
    ],
  });

  console.log(`Created ${resources.count} resources`);

  // Create alert rules
  await prisma.alertRule.createMany({
    data: [
      {
        organizationId: organization.id,
        name: 'High CPU Usage',
        description: 'Alert when CPU usage exceeds 80% for 5 minutes',
        isActive: true,
        metricType: 'cpu',
        condition: 'GREATER_THAN',
        threshold: 80,
        duration: 5,
        cooldownMinutes: 60,
      },
      {
        organizationId: organization.id,
        name: 'High Memory Usage',
        description: 'Alert when memory usage exceeds 85% for 5 minutes',
        isActive: true,
        metricType: 'memory',
        condition: 'GREATER_THAN',
        threshold: 85,
        duration: 5,
        cooldownMinutes: 60,
      },
      {
        organizationId: organization.id,
        name: 'Disk Space Low',
        description: 'Alert when disk space is below 20%',
        isActive: true,
        metricType: 'disk',
        condition: 'LESS_THAN',
        threshold: 20,
        duration: 1,
        cooldownMinutes: 120,
      },
    ],
  });

  console.log('Created alert rules');

  // Create cost report
  await prisma.costReport.create({
    data: {
      organizationId: organization.id,
      periodStart: new Date('2024-01-01'),
      periodEnd: new Date('2024-01-31'),
      computeCost: 4200.00,
      storageCost: 2800.00,
      networkCost: 1200.00,
      databaseCost: 1800.00,
      otherCost: 500.00,
      totalCost: 10500.00,
    },
  });

  console.log('Created cost report');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
