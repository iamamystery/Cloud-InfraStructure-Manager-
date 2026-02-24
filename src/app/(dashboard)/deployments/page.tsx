'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Github,
  GitCommit,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { mockData } from '@/lib/mock-data';

const statusColors: Record<string, string> = {
  SUCCESS: 'bg-green-500/10 text-green-500',
  FAILED: 'bg-red-500/10 text-red-500',
  RUNNING: 'bg-blue-500/10 text-blue-500',
  PENDING: 'bg-yellow-500/10 text-yellow-500',
};

export default function DeploymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deployments, setDeployments] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock deployments
    const mockDeployments = [
      { id: '1', name: 'Production Release v2.5.0', status: 'SUCCESS', branch: 'main', commit: 'a1b2c3d', duration: '4m 32s', time: '2 hours ago', triggeredBy: 'John Doe' },
      { id: '2', name: 'Staging Deploy', status: 'RUNNING', branch: 'develop', commit: 'e5f6g7h', duration: '2m 15s', time: '5 minutes ago', triggeredBy: 'Jane Smith' },
      { id: '3', name: 'Hotfix v2.4.1', status: 'SUCCESS', branch: 'hotfix/auth', commit: 'i8j9k0l', duration: '3m 45s', time: '1 day ago', triggeredBy: 'Bob Johnson' },
      { id: '4', name: 'Feature: Analytics', status: 'FAILED', branch: 'feature/analytics', commit: 'm1n2o3p', duration: '1m 20s', time: '2 days ago', triggeredBy: 'Alice Williams' },
      { id: '5', name: 'Production Release v2.4.0', status: 'SUCCESS', branch: 'main', commit: 'q4r5s6t', duration: '5m 10s', time: '3 days ago', triggeredBy: 'John Doe' },
    ];
    setDeployments(mockDeployments);
  }, []);

  const filteredDeployments = deployments.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Deployments</h1>
          <p className="text-muted-foreground mt-1">
            CI/CD pipelines and deployment history
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Pipeline
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{deployments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-500">
              {deployments.filter((d) => d.status === 'SUCCESS').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-500">
              {deployments.filter((d) => d.status === 'FAILED').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Running</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-blue-500">
              {deployments.filter((d) => d.status === 'RUNNING').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deployments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="RUNNING">Running</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deployments Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deployment</TableHead>
                  <TableHead className="hidden sm:table-cell">Branch</TableHead>
                  <TableHead className="hidden md:table-cell">Commit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeployments.map((deployment) => (
                  <TableRow key={deployment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{deployment.name}</div>
                        <div className="text-xs text-muted-foreground">{deployment.time} by {deployment.triggeredBy}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs">
                        <GitBranch className="mr-1 h-3 w-3" />
                        {deployment.branch}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <GitCommit className="h-3 w-3" />
                        {deployment.commit.substring(0, 7)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[deployment.status]} text-xs`}>
                        {deployment.status === 'SUCCESS' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {deployment.status === 'FAILED' && <XCircle className="mr-1 h-3 w-3" />}
                        {deployment.status === 'RUNNING' && <Clock className="mr-1 h-3 w-3" />}
                        {deployment.status}
                      </Badge>
                      {deployment.status === 'RUNNING' && (
                        <Progress value={65} className="h-1 mt-2 w-20" />
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{deployment.duration}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Logs</DropdownMenuItem>
                          <DropdownMenuItem>Redeploy</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredDeployments.length === 0 && (
            <div className="text-center py-8">
              <GitBranch className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <h3 className="mt-2 text-sm font-semibold">No deployments found</h3>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
