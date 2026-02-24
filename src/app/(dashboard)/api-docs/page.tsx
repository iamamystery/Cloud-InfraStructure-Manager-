'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCode,
  Book,
  Code,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Server,
  Database,
  Cloud,
  Shield,
  Key,
  Webhook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/resources',
    description: 'List all resources',
    auth: true,
  },
  {
    method: 'POST',
    path: '/api/v1/resources',
    description: 'Create a new resource',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/v1/resources/:id',
    description: 'Get resource details',
    auth: true,
  },
  {
    method: 'PATCH',
    path: '/api/v1/resources/:id',
    description: 'Update a resource',
    auth: true,
  },
  {
    method: 'DELETE',
    path: '/api/v1/resources/:id',
    description: 'Delete a resource',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/v1/metrics',
    description: 'Get metrics data',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/v1/alerts',
    description: 'List all alerts',
    auth: true,
  },
  {
    method: 'POST',
    path: '/api/v1/alerts',
    description: 'Create alert rule',
    auth: true,
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-blue-500/10 text-blue-500',
  POST: 'bg-green-500/10 text-green-500',
  PATCH: 'bg-yellow-500/10 text-yellow-500',
  DELETE: 'bg-red-500/10 text-red-500',
};

const codeExample = `curl -X GET \\
  'https://api.cloudmanager.io/v1/resources' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`;

const responseExample = `{
  "success": true,
  "data": [
    {
      "id": "res_123456",
      "name": "web-server-prod-01",
      "type": "VIRTUAL_MACHINE",
      "status": "RUNNING",
      "provider": "AWS",
      "region": "us-east-1",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1284
  }
}`;

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">API & Documentation</h1>
        <p className="text-muted-foreground mt-1">
          Integrate with our REST API and explore documentation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">50+</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">API Endpoints</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">v1</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current Version</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">OAuth 2</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Authentication</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Webhook className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">Webhooks</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Event Notifications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reference" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="reference" className="text-xs sm:text-sm">API Reference</TabsTrigger>
          <TabsTrigger value="example" className="text-xs sm:text-sm">Examples</TabsTrigger>
          <TabsTrigger value="keys" className="text-xs sm:text-sm">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="reference" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">REST API Endpoints</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Base URL: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">https://api.cloudmanager.io/v1</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-2">
                {endpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={`${methodColors[endpoint.method]} text-xs font-mono w-16 justify-center`}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                      {endpoint.auth && (
                        <Badge variant="outline" className="text-xs">
                          <Key className="mr-1 h-3 w-3" />
                          Auth
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="example" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Example Request</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Get all resources using cURL
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono">
                  <code>{codeExample}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Example Response</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Success response structure
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono">
                <code>{responseExample}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">API Keys</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your API keys for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Production Key</p>
                    <p className="text-xs text-muted-foreground">Created 2 weeks ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono hidden sm:block">
                    cm_live_••••••••••••••••
                  </code>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Development Key</p>
                    <p className="text-xs text-muted-foreground">Created 1 month ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono hidden sm:block">
                    cm_dev_••••••••••••••••
                  </code>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </div>

              <Button className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resources Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold mb-4">Resources</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Server className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Resources API</p>
                  <p className="text-xs text-muted-foreground mt-1">Manage cloud resources programmatically</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Database className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Databases API</p>
                  <p className="text-xs text-muted-foreground mt-1">Database and cache management</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Cloud className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Providers API</p>
                  <p className="text-xs text-muted-foreground mt-1">Multi-cloud provider integration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
