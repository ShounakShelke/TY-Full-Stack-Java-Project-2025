import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, BarChart3, AlertCircle, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserManagementPopup from "@/components/UserManagementPopup";
import SecurityPopup from "@/components/SecurityPopup";

export const AdminDashboard = () => {
  const [showUserManagementPopup, setShowUserManagementPopup] = useState(false);
  const [showSecurityPopup, setShowSecurityPopup] = useState(false);
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "admin", trend: "+12% this month" },
    { label: "Active Rentals", value: "156", icon: Activity, color: "admin", trend: "85% capacity" },
    { label: "System Health", value: "99.9%", icon: BarChart3, color: "green-500", trend: "All systems operational" },
    { label: "Open Tickets", value: "23", icon: AlertCircle, color: "orange-500", trend: "3 high priority" },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High API Usage",
      description: "Payment gateway approaching rate limit",
      time: "5 min ago"
    },
    {
      id: 2,
      type: "info",
      title: "System Backup Completed",
      description: "Daily backup completed successfully",
      time: "2 hours ago"
    },
  ];

  const recentActivities = [
    { action: "New vendor registration", user: "Fleet Pro Services", time: "10 min ago", type: "vendor" },
    { action: "System maintenance completed", user: "System", time: "2 hours ago", type: "system" },
    { action: "Payment dispute resolved", user: "Customer #1847", time: "4 hours ago", type: "payment" },
    { action: "License renewal", user: "AutoCorp Ltd", time: "1 day ago", type: "license" },
  ];

  const userMetrics = [
    { role: "Customers", count: 1847, percentage: 65, color: "customer" },
    { role: "Vendors", count: 423, percentage: 15, color: "vendor" },
    { role: "Mechanics", count: 156, percentage: 5, color: "mechanic" },
    { role: "Admins", count: 12, percentage: 1, color: "admin" },
  ];

  return (
    <div className="min-h-screen bg-background theme-admin">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">
              System Administration
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage the CarCircle platform
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-admin hover:bg-admin/90">
              <Shield className="h-4 w-4 mr-2" />
              Security Center
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <IconComponent className={`h-4 w-4 text-${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-admin" />
                  System Alerts
                </CardTitle>
                <CardDescription>
                  Recent system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border ${
                      alert.type === 'warning' ? 'border-orange-200 bg-orange-50/50' : 'border-blue-200 bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Badge variant={alert.type === 'warning' ? 'destructive' : 'secondary'}>
                        {alert.type}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* User Distribution */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">User Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userMetrics.map((metric) => (
                  <div key={metric.role} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.role}</span>
                      <span className="font-medium">{metric.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-${metric.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${metric.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-admin" />
                  Recent Platform Activity
                </CardTitle>
                <CardDescription>
                  Latest actions across the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${
                        activity.type === 'vendor' ? 'vendor' :
                        activity.type === 'system' ? 'green-500' :
                        activity.type === 'payment' ? 'admin' :
                        'blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowUserManagementPopup(true)}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-admin mx-auto mb-3" />
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage all platform users</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-admin mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Platform performance data</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowSecurityPopup(true)}>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-admin mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">Security & compliance</p>
            </CardContent>
          </Card>


        </motion.div>
      </div>

      {/* Popups */}
      {showUserManagementPopup && (
        <UserManagementPopup onClose={() => setShowUserManagementPopup(false)} />
      )}
      {showSecurityPopup && (
        <SecurityPopup onClose={() => setShowSecurityPopup(false)} />
      )}

    </div>
  );
};
