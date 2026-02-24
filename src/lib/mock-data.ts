// Mock data store for Cloud Infrastructure Manager
// This replaces the backend API with client-side mock data

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'DEVOPS_ENGINEER' | 'VIEWER' | 'BILLING_ADMIN';
  subscriptionTier: 'FREE' | 'PRO' | 'ENTERPRISE';
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  billingEmail: string;
  subscriptionTier: 'FREE' | 'PRO' | 'ENTERPRISE';
}

export interface CloudProvider {
  id: string;
  name: string;
  type: 'AWS' | 'AZURE' | 'GCP' | 'DIGITAL_OCEAN' | 'ALIBABA_CLOUD';
  status: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING';
  regions: string[];
  lastSyncedAt?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  status: 'RUNNING' | 'STOPPED' | 'PENDING' | 'ERROR' | 'TERMINATED' | 'CREATING' | 'DELETING';
  cloudProviderId: string;
  cloudProvider?: CloudProvider;
  region: string;
  zone?: string;
  specifications: Record<string, any>;
  tags: string[];
  estimatedMonthlyCost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  resourceId?: string;
  status: 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED';
}

export interface Activity {
  id: string;
  action: string;
  resource: string;
  status: 'success' | 'failed' | 'pending';
  time: string;
  user: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
  avatar?: string;
  joinedAt: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
}

export interface CostData {
  name: string;
  compute: number;
  storage: number;
  network: number;
  database: number;
}

// Mock Users
export const mockUser: User = {
  id: '1',
  email: 'john.doe@company.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'DEVOPS_ENGINEER',
  subscriptionTier: 'PRO',
  avatar: '/avatar.png',
};

// Mock Organization
export const mockOrganization: Organization = {
  id: '1',
  name: 'Acme Corporation',
  slug: 'acme-corp',
  description: 'Enterprise cloud infrastructure management',
  billingEmail: 'billing@acme.com',
  subscriptionTier: 'PRO',
};

// Mock Cloud Providers
export const mockCloudProviders: CloudProvider[] = [
  {
    id: '1',
    name: 'AWS Production',
    type: 'AWS',
    status: 'CONNECTED',
    regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
    lastSyncedAt: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Azure Dev',
    type: 'AZURE',
    status: 'CONNECTED',
    regions: ['East US', 'West Europe'],
    lastSyncedAt: '5 minutes ago',
  },
  {
    id: '3',
    name: 'GCP Analytics',
    type: 'GCP',
    status: 'CONNECTED',
    regions: ['us-central1', 'europe-west1'],
    lastSyncedAt: '10 minutes ago',
  },
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'web-server-prod-01',
    type: 'VIRTUAL_MACHINE',
    status: 'RUNNING',
    cloudProviderId: '1',
    cloudProvider: mockCloudProviders[0],
    region: 'us-east-1',
    zone: 'us-east-1a',
    specifications: { cpu: 8, memory: '32GB', storage: '500GB SSD' },
    tags: ['production', 'web', 'critical'],
    estimatedMonthlyCost: 450.50,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20',
  },
  {
    id: '2',
    name: 'postgres-primary',
    type: 'DATABASE',
    status: 'RUNNING',
    cloudProviderId: '1',
    cloudProvider: mockCloudProviders[0],
    region: 'us-east-1',
    specifications: { engine: 'PostgreSQL 15', instance: 'db.r6g.2xlarge', storage: '2TB' },
    tags: ['production', 'database', 'postgres'],
    estimatedMonthlyCost: 892.00,
    createdAt: '2024-01-10',
    updatedAt: '2024-02-18',
  },
  {
    id: '3',
    name: 'redis-cache-cluster',
    type: 'CACHE',
    status: 'RUNNING',
    cloudProviderId: '1',
    cloudProvider: mockCloudProviders[0],
    region: 'us-east-1',
    specifications: { nodeType: 'cache.r6g.large', nodes: 3 },
    tags: ['cache', 'redis', 'cluster'],
    estimatedMonthlyCost: 245.80,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-15',
  },
  {
    id: '4',
    name: 'api-gateway-east',
    type: 'LOAD_BALANCER',
    status: 'RUNNING',
    cloudProviderId: '2',
    cloudProvider: mockCloudProviders[1],
    region: 'East US',
    specifications: { type: 'Application Gateway', tier: 'WAF_v2' },
    tags: ['gateway', 'api', 'azure'],
    estimatedMonthlyCost: 178.50,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-19',
  },
  {
    id: '5',
    name: 'mongodb-analytics',
    type: 'DATABASE',
    status: 'RUNNING',
    cloudProviderId: '3',
    cloudProvider: mockCloudProviders[2],
    region: 'us-central1',
    specifications: { engine: 'MongoDB 6.0', instance: 'M60', storage: '1TB' },
    tags: ['analytics', 'mongodb', 'gcp'],
    estimatedMonthlyCost: 567.25,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-17',
  },
  {
    id: '6',
    name: 'dev-server-ubuntu',
    type: 'VIRTUAL_MACHINE',
    status: 'STOPPED',
    cloudProviderId: '1',
    cloudProvider: mockCloudProviders[0],
    region: 'us-west-2',
    specifications: { cpu: 4, memory: '16GB', storage: '200GB SSD' },
    tags: ['development', 'ubuntu'],
    estimatedMonthlyCost: 145.00,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-20',
  },
  {
    id: '7',
    name: 'k8s-cluster-prod',
    type: 'KUBERNETES_CLUSTER',
    status: 'RUNNING',
    cloudProviderId: '2',
    cloudProvider: mockCloudProviders[1],
    region: 'West Europe',
    specifications: { version: '1.28', nodes: 12, nodeType: 'Standard_D4s_v3' },
    tags: ['kubernetes', 'production', 'aks'],
    estimatedMonthlyCost: 1250.00,
    createdAt: '2023-12-01',
    updatedAt: '2024-02-20',
  },
  {
    id: '8',
    name: 'lambda-processing',
    type: 'SERVERLESS_FUNCTION',
    status: 'RUNNING',
    cloudProviderId: '1',
    cloudProvider: mockCloudProviders[0],
    region: 'us-east-1',
    specifications: { runtime: 'Node.js 18', memory: '512MB', timeout: '30s' },
    tags: ['lambda', 'serverless', 'processing'],
    estimatedMonthlyCost: 45.30,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-19',
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    message: 'High CPU usage on web-server-prod-01 (>90% for 10 min)',
    time: '5 minutes ago',
    resourceId: '1',
    status: 'OPEN',
  },
  {
    id: '2',
    severity: 'warning',
    message: 'Storage capacity at 85% on postgres-primary',
    time: '1 hour ago',
    resourceId: '2',
    status: 'OPEN',
  },
  {
    id: '3',
    severity: 'warning',
    message: 'Memory usage above 80% on k8s-cluster-prod',
    time: '2 hours ago',
    resourceId: '7',
    status: 'ACKNOWLEDGED',
  },
  {
    id: '4',
    severity: 'info',
    message: 'New security update available for nginx',
    time: '3 hours ago',
    status: 'OPEN',
  },
  {
    id: '5',
    severity: 'critical',
    message: 'Database connection timeout on mongodb-analytics',
    time: '30 minutes ago',
    resourceId: '5',
    status: 'OPEN',
  },
];

// Mock Activity
export const mockActivities: Activity[] = [
  {
    id: '1',
    action: 'Deployed new VM',
    resource: 'web-server-prod-01',
    status: 'success',
    time: '2 minutes ago',
    user: 'John Doe',
  },
  {
    id: '2',
    action: 'Scaled database',
    resource: 'postgres-primary',
    status: 'success',
    time: '15 minutes ago',
    user: 'Jane Smith',
  },
  {
    id: '3',
    action: 'Created backup',
    resource: 'mongodb-cluster',
    status: 'pending',
    time: '32 minutes ago',
    user: 'John Doe',
  },
  {
    id: '4',
    action: 'Restarted service',
    resource: 'api-gateway',
    status: 'failed',
    time: '1 hour ago',
    user: 'System',
  },
  {
    id: '5',
    action: 'Updated configuration',
    resource: 'redis-cache-cluster',
    status: 'success',
    time: '2 hours ago',
    user: 'Mike Johnson',
  },
  {
    id: '6',
    action: 'Created new cluster',
    resource: 'k8s-cluster-prod',
    status: 'success',
    time: '3 hours ago',
    user: 'Sarah Williams',
  },
];

// Mock Team Members
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    userId: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    role: 'OWNER',
    joinedAt: '2023-11-01',
    status: 'ACTIVE',
  },
  {
    id: '2',
    userId: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    role: 'ADMIN',
    joinedAt: '2023-12-15',
    status: 'ACTIVE',
  },
  {
    id: '3',
    userId: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@company.com',
    role: 'MEMBER',
    joinedAt: '2024-01-10',
    status: 'ACTIVE',
  },
  {
    id: '4',
    userId: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@company.com',
    role: 'MEMBER',
    joinedAt: '2024-02-01',
    status: 'ACTIVE',
  },
  {
    id: '5',
    userId: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@company.com',
    role: 'GUEST',
    joinedAt: '2024-02-15',
    status: 'PENDING',
  },
];

// Mock Cost Data
export const mockCostData: CostData[] = [
  { name: 'Jan', compute: 4200, storage: 2800, network: 1200, database: 2100 },
  { name: 'Feb', compute: 4500, storage: 2900, network: 1300, database: 2300 },
  { name: 'Mar', compute: 4800, storage: 3000, network: 1400, database: 2500 },
  { name: 'Apr', compute: 4700, storage: 2950, network: 1350, database: 2450 },
  { name: 'May', compute: 5100, storage: 3200, network: 1500, database: 2700 },
  { name: 'Jun', compute: 5400, storage: 3400, network: 1600, database: 2800 },
];

// Mock Stats
export const mockStats = {
  totalResources: mockResources.length,
  activeResources: mockResources.filter(r => r.status === 'RUNNING').length,
  stoppedResources: mockResources.filter(r => r.status === 'STOPPED').length,
  monthlyCost: mockResources.reduce((acc, r) => acc + (r.estimatedMonthlyCost || 0), 0),
  alertsCount: mockAlerts.filter(a => a.status === 'OPEN').length,
  cloudProviders: mockCloudProviders.length,
};

// Resource Distribution for Charts
export const resourceDistribution = [
  { name: 'AWS', value: 45, color: '#FF9900' },
  { name: 'Azure', value: 30, color: '#0078D4' },
  { name: 'GCP', value: 25, color: '#4285F4' },
];

// Stats for Dashboard
export const dashboardStats = [
  {
    name: 'Total Resources',
    value: '1,284',
    change: '+12.5%',
    trend: 'up',
    icon: 'Server',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'Active Instances',
    value: '892',
    change: '+8.2%',
    trend: 'up',
    icon: 'Cloud',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    name: 'Monthly Cost',
    value: '$12,450',
    change: '-5.4%',
    trend: 'down',
    icon: 'Wallet',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    name: 'Uptime',
    value: '99.98%',
    change: '+0.02%',
    trend: 'up',
    icon: 'Activity',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

// LocalStorage keys
const STORAGE_KEYS = {
  USER: 'cloud_manager_user',
  ORGANIZATION: 'cloud_manager_org',
  RESOURCES: 'cloud_manager_resources',
  ALERTS: 'cloud_manager_alerts',
  ACTIVITIES: 'cloud_manager_activities',
  IS_LOGGED_IN: 'cloud_manager_logged_in',
};

// Mock Auth Functions
export const mockAuth = {
  login: (email: string, password: string): boolean => {
    // Simple mock auth - accept any email with @ and password > 5 chars
    if (email.includes('@') && password.length > 5) {
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      localStorage.setItem(STORAGE_KEYS.ORGANIZATION, JSON.stringify(mockOrganization));
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ORGANIZATION);
  },

  isLoggedIn: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  getOrganization: (): Organization | null => {
    if (typeof window === 'undefined') return null;
    const org = localStorage.getItem(STORAGE_KEYS.ORGANIZATION);
    return org ? JSON.parse(org) : null;
  },
};

// Mock Data Functions
export const mockData = {
  getResources: (): Resource[] => {
    if (typeof window === 'undefined') return mockResources;
    const stored = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return stored ? JSON.parse(stored) : mockResources;
  },

  setResources: (resources: Resource[]) => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  },

  getAlerts: (): Alert[] => {
    if (typeof window === 'undefined') return mockAlerts;
    const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return stored ? JSON.parse(stored) : mockAlerts;
  },

  setAlerts: (alerts: Alert[]) => {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
  },

  getActivities: (): Activity[] => {
    if (typeof window === 'undefined') return mockActivities;
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return stored ? JSON.parse(stored) : mockActivities;
  },

  addActivity: (activity: Activity) => {
    const activities = mockData.getActivities();
    activities.unshift(activity);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities.slice(0, 50)));
  },
};

// Initialize mock data on first load
export const initializeMockData = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(mockResources));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(mockAlerts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(mockActivities));
  }
};
