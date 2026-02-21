// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  DEVOPS_ENGINEER = 'DEVOPS_ENGINEER',
  VIEWER = 'VIEWER',
  BILLING_ADMIN = 'BILLING_ADMIN',
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  DEACTIVATED = 'DEACTIVATED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  accountStatus: AccountStatus;
  emailVerified: boolean;
  avatar?: string;
  phoneNumber?: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  plan?: SubscriptionTier;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ============================================
// ORGANIZATION & TEAM TYPES
// ============================================

export enum OrganizationMemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  billingEmail: string;
  subscriptionTier: SubscriptionTier;
  maxProjects: number;
  maxTeamMembers: number;
  maxCloudProviders: number;
  maxResources: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  user: User;
  role: OrganizationMemberRole;
  joinedAt: Date;
}

// ============================================
// CLOUD PROVIDER TYPES
// ============================================

export enum CloudProviderType {
  AWS = 'AWS',
  AZURE = 'AZURE',
  GCP = 'GCP',
  DIGITAL_OCEAN = 'DIGITAL_OCEAN',
  ALIBABA_CLOUD = 'ALIBABA_CLOUD',
}

export enum CloudProviderStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

export interface CloudProvider {
  id: string;
  organizationId: string;
  name: string;
  type: CloudProviderType;
  status: CloudProviderStatus;
  regions: string[];
  lastSyncedAt?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CloudProviderCredentials {
  // AWS
  accessKeyId?: string;
  secretAccessKey?: string;
  region?: string;
  // Azure
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
  subscriptionId?: string;
  // GCP
  projectId?: string;
  privateKey?: string;
  clientEmail?: string;
}

// ============================================
// RESOURCE TYPES
// ============================================

export enum ResourceType {
  VIRTUAL_MACHINE = 'VIRTUAL_MACHINE',
  CONTAINER = 'CONTAINER',
  CONTAINER_REGISTRY = 'CONTAINER_REGISTRY',
  DATABASE = 'DATABASE',
  STORAGE_BUCKET = 'STORAGE_BUCKET',
  LOAD_BALANCER = 'LOAD_BALANCER',
  NETWORK = 'NETWORK',
  FIREWALL = 'FIREWALL',
  KUBERNETES_CLUSTER = 'KUBERNETES_CLUSTER',
  SERVERLESS_FUNCTION = 'SERVERLESS_FUNCTION',
  CACHE = 'CACHE',
  QUEUE = 'QUEUE',
  TOPIC = 'TOPIC',
}

export enum ResourceStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  TERMINATED = 'TERMINATED',
  CREATING = 'CREATING',
  DELETING = 'DELETING',
  UPDATING = 'UPDATING',
  MAINTENANCE = 'MAINTENANCE',
}

export interface Resource {
  id: string;
  organizationId: string;
  projectId?: string;
  environmentId?: string;
  cloudProviderId: string;
  cloudProvider: CloudProvider;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  cloudResourceId?: string;
  region: string;
  zone?: string;
  specifications: Record<string, any>;
  tags: string[];
  labels: Record<string, string>;
  config: Record<string, any>;
  networking: Record<string, any>;
  estimatedMonthlyCost?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateResourceInput {
  name: string;
  type: ResourceType;
  cloudProviderId: string;
  region: string;
  specifications: Record<string, any>;
  projectId?: string;
  environmentId?: string;
  tags?: string[];
}

// ============================================
// METRICS & MONITORING TYPES
// ============================================

export interface ResourceMetric {
  id: string;
  resourceId: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface ResourceLog {
  id: string;
  resourceId: string;
  level: LogLevel;
  message: string;
  source?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// ============================================
// DEPLOYMENT TYPES
// ============================================

export enum DeploymentStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  ROLLING_BACK = 'ROLLING_BACK',
  ROLLED_BACK = 'ROLLED_BACK',
}

export interface Deployment {
  id: string;
  organizationId: string;
  projectId?: string;
  environmentId?: string;
  resourceId?: string;
  name: string;
  version: string;
  status: DeploymentStatus;
  commitHash?: string;
  branch?: string;
  buildNumber?: number;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pipeline {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  repositoryUrl: string;
  branch: string;
  isActive: boolean;
  lastRunAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ALERT TYPES
// ============================================

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export enum AlertStatus {
  OPEN = 'OPEN',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
  IGNORED = 'IGNORED',
}

export interface Alert {
  id: string;
  organizationId: string;
  resourceId?: string;
  alertRuleId?: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
}

export enum AlertCondition {
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  EQUAL_TO = 'EQUAL_TO',
  NOT_EQUAL_TO = 'NOT_EQUAL_TO',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
}

export interface AlertRule {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  isActive: boolean;
  resourceType?: ResourceType;
  metricType: string;
  condition: AlertCondition;
  threshold: number;
  duration: number;
  cooldownMinutes: number;
  lastTriggeredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// COST MANAGEMENT TYPES
// ============================================

export interface CostReport {
  id: string;
  organizationId: string;
  cloudProviderId?: string;
  periodStart: Date;
  periodEnd: Date;
  computeCost: number;
  storageCost: number;
  networkCost: number;
  databaseCost: number;
  otherCost: number;
  totalCost: number;
  createdAt: Date;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: number;
}

export interface CostOptimizationRecommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  potentialSavings: number;
  priority: 'low' | 'medium' | 'high';
  resourceIds: string[];
  createdAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
