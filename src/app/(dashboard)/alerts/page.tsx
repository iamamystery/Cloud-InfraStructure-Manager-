'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  Clock,
  X,
  Filter,
  Server,
  Database,
  Network,
  Shield,
  AlertTriangle,
  Info,
  MoreHorizontal,
  Check,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockData, type Alert } from '@/lib/mock-data';

const severityIcons = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const severityColors = {
  critical: 'text-red-500 bg-red-500/10 border-red-500/20',
  warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  info: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
};

const statusColors = {
  OPEN: 'bg-red-500/10 text-red-500',
  ACKNOWLEDGED: 'bg-yellow-500/10 text-yellow-500',
  RESOLVED: 'bg-green-500/10 text-green-500',
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setAlerts(mockData.getAlerts());
  }, []);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const stats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity === 'critical').length,
    warning: alerts.filter((a) => a.severity === 'warning').length,
    info: alerts.filter((a) => a.severity === 'info').length,
    open: alerts.filter((a) => a.status === 'OPEN').length,
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage system alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            Acknowledge All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-bold">{stats.total}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total Alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-lg font-bold text-red-500">{stats.critical}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Critical</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-lg font-bold text-yellow-500">{stats.warning}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Warning</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-lg font-bold text-blue-500">{stats.info}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Info</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-lg font-bold text-orange-500">{stats.open}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Open</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="ACKNOWLEDGED">Acknowledged</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Active Alerts</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Showing {filteredAlerts.length} of {alerts.length} alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3">
              {filteredAlerts.map((alert) => {
                const Icon = severityIcons[alert.severity];
                return (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border ${severityColors[alert.severity]}`}
                  >
                    <div className="mt-0.5">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="font-medium text-sm">{alert.message}</p>
                        <Badge className={`${statusColors[alert.status]} text-xs w-fit`}>
                          {alert.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs">
                        <span className="opacity-80">{alert.time}</span>
                        {alert.resourceId && (
                          <>
                            <span className="opacity-50 hidden sm:inline">•</span>
                            <span className="opacity-80 flex items-center gap-1">
                              <Server className="h-3 w-3" />
                              Resource #{alert.resourceId}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Acknowledge
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Resolve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto h-8 w-8 text-green-500" />
                <h3 className="mt-2 text-sm font-semibold">No alerts found</h3>
                <p className="text-xs text-muted-foreground">All systems are healthy!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
