'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  Network,
  Clock,
  AlertCircle,
  CheckCircle2,
  Server,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { mockData } from '@/lib/mock-data';

// Mock metrics data
const cpuData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 78 },
  { time: '12:00', value: 65 },
  { time: '16:00', value: 85 },
  { time: '20:00', value: 55 },
  { time: '23:59', value: 48 },
];

const memoryData = [
  { time: '00:00', value: 60 },
  { time: '04:00', value: 62 },
  { time: '08:00', value: 75 },
  { time: '12:00', value: 80 },
  { time: '16:00', value: 70 },
  { time: '20:00', value: 65 },
  { time: '23:59', value: 63 },
];

const networkData = [
  { time: '00:00', in: 120, out: 80 },
  { time: '04:00', in: 100, out: 60 },
  { time: '08:00', in: 450, out: 200 },
  { time: '12:00', in: 600, out: 350 },
  { time: '16:00', in: 550, out: 300 },
  { time: '20:00', in: 400, out: 250 },
  { time: '23:59', in: 150, out: 100 },
];

const metrics = [
  { name: 'CPU Usage', value: '45%', change: '-5%', trend: 'down', icon: Cpu, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { name: 'Memory', value: '6.4 GB', change: '+8%', trend: 'up', icon: HardDrive, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'Network In', value: '450 MB/s', change: '+12%', trend: 'up', icon: Network, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { name: 'Uptime', value: '99.98%', change: '0%', trend: 'neutral', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
];

export default function MonitoringPage() {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    setResources(mockData.getResources().filter((r: any) => r.status === 'RUNNING'));
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Real-time metrics and performance monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs sm:text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color}`} />
                  </div>
                  <div className={`flex items-center text-xs ${
                    metric.trend === 'up' ? 'text-red-500' : 
                    metric.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {metric.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                    {metric.trend === 'neutral' && <Minus className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-lg sm:text-xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.name}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="cpu" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="cpu" className="text-xs sm:text-sm">CPU</TabsTrigger>
          <TabsTrigger value="memory" className="text-xs sm:text-sm">Memory</TabsTrigger>
          <TabsTrigger value="network" className="text-xs sm:text-sm">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">CPU Usage</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Average CPU utilization over 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="h-[200px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData}>
                    <defs>
                      <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#cpuGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Memory Usage</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Memory utilization over 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="h-[200px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData}>
                    <defs>
                      <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#22c55e" fill="url(#memoryGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Network Traffic</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Inbound and outbound traffic (MB/s)</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="h-[200px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="in" stroke="#8b5cf6" strokeWidth={2} name="Inbound" />
                    <Line type="monotone" dataKey="out" stroke="#06b6d4" strokeWidth={2} name="Outbound" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resource Health */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Resource Health</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Status of your monitored resources</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3">
              {resources.slice(0, 5).map((resource) => (
                <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                      <span>CPU: {Math.floor(Math.random() * 40 + 30)}%</span>
                      <span>Mem: {Math.floor(Math.random() * 30 + 40)}%</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                      Healthy
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
