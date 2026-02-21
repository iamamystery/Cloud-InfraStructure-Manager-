'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Server,
  Database,
  Cloud,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  Square,
  RotateCcw,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockResources = [
  {
    id: '1',
    name: 'web-server-prod-01',
    type: 'VIRTUAL_MACHINE',
    provider: 'AWS',
    region: 'us-east-1',
    status: 'RUNNING',
    cost: 145.50,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'postgres-primary',
    type: 'DATABASE',
    provider: 'AWS',
    region: 'us-east-1',
    status: 'RUNNING',
    cost: 89.20,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'api-gateway',
    type: 'SERVERLESS_FUNCTION',
    provider: 'AZURE',
    region: 'eastus',
    status: 'RUNNING',
    cost: 45.00,
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'redis-cache',
    type: 'CACHE',
    provider: 'GCP',
    region: 'us-central1',
    status: 'STOPPED',
    cost: 25.00,
    createdAt: '2024-02-01',
  },
  {
    id: '5',
    name: 'storage-bucket-assets',
    type: 'STORAGE_BUCKET',
    provider: 'AWS',
    region: 'eu-west-1',
    status: 'RUNNING',
    cost: 12.30,
    createdAt: '2024-01-05',
  },
];

const resourceTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  VIRTUAL_MACHINE: Server,
  DATABASE: Database,
  STORAGE_BUCKET: Cloud,
  SERVERLESS_FUNCTION: Activity,
  CACHE: Activity,
};

const statusColors: Record<string, string> = {
  RUNNING: 'bg-green-500/10 text-green-500',
  STOPPED: 'bg-gray-500/10 text-gray-500',
  ERROR: 'bg-red-500/10 text-red-500',
  PENDING: 'bg-yellow-500/10 text-yellow-500',
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">
            Manage your cloud infrastructure resources
          </p>
        </div>
        <Link href="/resources/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockResources.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {mockResources.filter((r) => r.status === 'RUNNING').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stopped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">
              {mockResources.filter((r) => r.status === 'STOPPED').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockResources.reduce((sum, r) => sum + r.cost, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="VIRTUAL_MACHINE">Virtual Machine</SelectItem>
            <SelectItem value="DATABASE">Database</SelectItem>
            <SelectItem value="STORAGE_BUCKET">Storage</SelectItem>
            <SelectItem value="SERVERLESS_FUNCTION">Function</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Activity className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="RUNNING">Running</SelectItem>
            <SelectItem value="STOPPED">Stopped</SelectItem>
            <SelectItem value="ERROR">Error</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resources Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost/Month</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => {
                const Icon = resourceTypeIcons[resource.type] || Server;
                return (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/resources/${resource.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {resource.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{resource.type.replace(/_/g, ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.provider}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{resource.region}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[resource.status]}>
                        {resource.status === 'RUNNING' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {resource.status === 'STOPPED' && <XCircle className="mr-1 h-3 w-3" />}
                        {resource.status === 'PENDING' && <Clock className="mr-1 h-3 w-3" />}
                        {resource.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${resource.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-sm">{resource.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Square className="mr-2 h-4 w-4" />
                            Stop
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restart
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Server className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or add a new resource
              </p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredResources.length} of {mockResources.length} resources
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
