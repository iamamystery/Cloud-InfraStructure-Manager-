'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Server,
  Database,
  Activity,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockData, mockStats, resourceDistribution, mockCostData, type Alert, type Activity as ActivityType } from '@/lib/mock-data';

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // Load mock data
    setAlerts(mockData.getAlerts().slice(0, 5));
    setActivities(mockData.getActivities().slice(0, 5));
    setResources(mockData.getResources());
  }, []);

  const statsCards = [
    {
      name: 'Total Resources',
      value: stats.totalResources.toString(),
      change: '+12.5%',
      trend: 'up',
      icon: Server,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Active Instances',
      value: stats.activeResources.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: Cloud,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Monthly Cost',
      value: `$${stats.monthlyCost.toLocaleString()}`,
      change: '-5.4%',
      trend: 'down',
      icon: Wallet,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      name: 'Uptime',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your cloud infrastructure and resources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm">Add Resource</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center text-xs sm:text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Cost Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Cost Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly cost breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockCostData}>
                    <defs>
                      <linearGradient id="colorCompute" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="compute" stackId="1" stroke="#8884d8" fill="url(#colorCompute)" name="Compute" />
                    <Area type="monotone" dataKey="storage" stackId="1" stroke="#82ca9d" fill="url(#colorStorage)" name="Storage" />
                    <Area type="monotone" dataKey="network" stackId="1" stroke="#ffc658" fill="#ffc658" name="Network" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resource Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Resource Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Resources by cloud provider</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="h-[200px] sm:h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {resourceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4">
                {resourceDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs sm:text-sm">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity & Alerts Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Latest actions across your infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 sm:gap-4">
                    <div className={`mt-1 p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500/10' :
                      activity.status === 'failed' ? 'bg-red-500/10' :
                      'bg-yellow-500/10'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : activity.status === 'failed' ? (
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                      ) : (
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {activity.resource}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    <Badge variant={
                      activity.status === 'success' ? 'default' :
                      activity.status === 'failed' ? 'destructive' :
                      'secondary'
                    } className="text-xs flex-shrink-0">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Active Alerts</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Issues requiring attention</CardDescription>
              </div>
              <Badge variant="destructive" className="flex-shrink-0">{alerts.filter(a => a.status === 'OPEN').length} Active</Badge>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 sm:gap-4">
                    <div className={`mt-1 p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                      alert.severity === 'critical' ? 'bg-red-500/10' :
                      alert.severity === 'warning' ? 'bg-yellow-500/10' :
                      'bg-blue-500/10'
                    }`}>
                      <AlertCircle className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'warning' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                    <Badge variant={
                      alert.severity === 'critical' ? 'destructive' :
                      alert.severity === 'warning' ? 'secondary' :
                      'outline'
                    } className="text-xs flex-shrink-0">
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
