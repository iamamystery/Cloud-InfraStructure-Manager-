'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Server,
  Database,
  Network,
  HardDrive,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockData, mockCostData } from '@/lib/mock-data';

const costBreakdown = [
  { name: 'Compute', value: 5400, color: '#3b82f6' },
  { name: 'Storage', value: 3400, color: '#22c55e' },
  { name: 'Network', value: 1600, color: '#f59e0b' },
  { name: 'Database', value: 2800, color: '#8b5cf6' },
];

export default function CostsPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const allResources = mockData.getResources();
    setResources(allResources);
    const cost = allResources.reduce((sum: number, r: any) => sum + (r.estimatedMonthlyCost || 0), 0);
    setTotalCost(cost);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Cost Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track and optimize your cloud spending
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5.4%
              </div>
            </div>
            <div className="mt-3">
              <p className="text-lg sm:text-xl font-bold">${totalCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Monthly Cost</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Server className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </div>
            </div>
            <div className="mt-3">
              <p className="text-lg sm:text-xl font-bold">$5,400</p>
              <p className="text-xs text-muted-foreground">Compute</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
              <div className="flex items-center text-xs text-red-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </div>
            </div>
            <div className="mt-3">
              <p className="text-lg sm:text-xl font-bold">$2,800</p>
              <p className="text-xs text-muted-foreground">Database</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Network className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              </div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                -1.5%
              </div>
            </div>
            <div className="mt-3">
              <p className="text-lg sm:text-xl font-bold">$1,600</p>
              <p className="text-xs text-muted-foreground">Network</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="resources" className="text-xs sm:text-sm">By Resource</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Cost Breakdown</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Current month by category</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4">
                  {costBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs sm:text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Monthly Trend</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Last 6 months spending</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockCostData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="compute" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="storage" stackId="a" fill="#22c55e" />
                      <Bar dataKey="network" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="database" stackId="a" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Top Resources by Cost</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Highest spending resources this month</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {resources
                  .sort((a, b) => (b.estimatedMonthlyCost || 0) - (a.estimatedMonthlyCost || 0))
                  .slice(0, 8)
                  .map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">{resource.type} • {resource.cloudProvider?.type || 'AWS'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${resource.estimatedMonthlyCost?.toFixed(2) || '0.00'}/mo</p>
                        <Badge variant="outline" className="text-xs">{resource.status}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Cost Optimization Recommendations</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Potential savings identified</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                  <HardDrive className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Underutilized Resources</p>
                    <p className="text-xs text-muted-foreground mt-1">3 VMs running below 20% CPU for 7+ days</p>
                    <p className="text-sm font-medium text-green-500 mt-2">Potential savings: $450/month</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <Database className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Reserved Instance Recommendations</p>
                    <p className="text-xs text-muted-foreground mt-1">Convert 5 on-demand instances to reserved</p>
                    <p className="text-sm font-medium text-green-500 mt-2">Potential savings: $890/month</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <Network className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Network Optimization</p>
                    <p className="text-xs text-muted-foreground mt-1">Enable compression for data transfer</p>
                    <p className="text-sm font-medium text-green-500 mt-2">Potential savings: $230/month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
