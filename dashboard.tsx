"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Server, Shield, Activity, HardDrive } from 'lucide-react'

// Mock data
const trafficData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
]

const metricsData = [
  { name: '00:00', cpu: 40, memory: 60, network: 30 },
  { name: '04:00', cpu: 30, memory: 55, network: 25 },
  { name: '08:00', cpu: 60, memory: 70, network: 45 },
  { name: '12:00', cpu: 85, memory: 80, network: 70 },
  { name: '16:00', cpu: 70, memory: 75, network: 60 },
  { name: '20:00', cpu: 55, memory: 65, network: 40 },
]

const logData = [
  { timestamp: '2023-06-15 10:30:45', level: 'INFO', message: 'User login successful' },
  { timestamp: '2023-06-15 10:31:22', level: 'WARNING', message: 'High CPU usage detected' },
  { timestamp: '2023-06-15 10:32:01', level: 'ERROR', message: 'Database connection failed' },
  { timestamp: '2023-06-15 10:33:15', level: 'INFO', message: 'Scheduled backup completed' },
  { timestamp: '2023-06-15 10:34:30', level: 'WARNING', message: 'Low disk space on server' },
]

const assetData = [
  { id: 'AS001', name: 'Web Server 1', type: 'Server', status: 'Active' },
  { id: 'AS002', name: 'Database Server', type: 'Server', status: 'Active' },
  { id: 'AS003', name: 'Dev Laptop 1', type: 'Laptop', status: 'Inactive' },
  { id: 'AS004', name: 'Network Switch', type: 'Network', status: 'Active' },
  { id: 'AS005', name: 'Backup Server', type: 'Server', status: 'Maintenance' },
]

const patchData = [
  { id: 'P001', name: 'Security Update 2023-06', status: 'Pending', severity: 'High' },
  { id: 'P002', name: 'OS Patch KB123456', status: 'Installed', severity: 'Medium' },
  { id: 'P003', name: 'Database Hotfix', status: 'Failed', severity: 'Critical' },
  { id: 'P004', name: 'Firmware Update v2.1', status: 'Scheduled', severity: 'Low' },
  { id: 'P005', name: 'Application Patch v3.0.1', status: 'Installing', severity: 'Medium' },
]

export default function Dashboard() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Hello! How can I assist you today?' },
  ])

  const [userInput, setUserInput] = useState('')

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: userInput }])
      // In a real application, you would send this message to a backend for processing
      // and receive a response. For now, we'll just echo the user's message.
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'bot', content: `You said: ${userInput}` }])
      }, 1000)
      setUserInput('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">IT Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily network traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={trafficData}
              index="name"
              categories={['value']}
              colors={['blue']}
              valueFormatter={(value) => `${value} GB`}
              className="aspect-[4/3]"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
            <CardDescription>CPU, Memory, and Network usage</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={metricsData}
              index="name"
              categories={['cpu', 'memory', 'network']}
              colors={['red', 'green', 'blue']}
              valueFormatter={(value) => `${value}%`}
              className="aspect-[4/3]"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Recent system events</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logData.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={log.level === 'ERROR' ? 'destructive' : log.level === 'WARNING' ? 'warning' : 'default'}>
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Virtual Assistant</CardTitle>
            <CardDescription>Ask for help or information</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] mb-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`rounded-lg p-2 max-w-[80%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-md p-2"
              />
              <Button onClick={handleSendMessage} className="rounded-l-none">Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Asset and Patch Management</CardTitle>
            <CardDescription>Overview of system assets and pending patches</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="assets">
              <TabsList>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="patches">Patches</TabsTrigger>
              </TabsList>
              <TabsContent value="assets">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetData.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>{asset.id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>
                          <Badge variant={asset.status === 'Active' ? 'default' : asset.status === 'Inactive' ? 'secondary' : 'outline'}>
                            {asset.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="patches">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patchData.map((patch) => (
                      <TableRow key={patch.id}>
                        <TableCell>{patch.id}</TableCell>
                        <TableCell>{patch.name}</TableCell>
                        <TableCell>
                          <Badge variant={
                            patch.status === 'Installed' ? 'default' :
                            patch.status === 'Pending' ? 'secondary' :
                            patch.status === 'Failed' ? 'destructive' :
                            'outline'
                          }>
                            {patch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            patch.severity === 'Critical' ? 'destructive' :
                            patch.severity === 'High' ? 'warning' :
                            patch.severity === 'Medium' ? 'default' :
                            'secondary'
                          }>
                            {patch.severity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}