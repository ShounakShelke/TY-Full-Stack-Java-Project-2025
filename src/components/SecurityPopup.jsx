import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const SecurityPopup = ({ onClose }) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const securitySettings = [
    {
      id: 1,
      title: "Password Policy",
      description: "Minimum 8 characters, must include uppercase, lowercase, and numbers",
      status: "Active",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Login Attempts",
      description: "Maximum 5 failed attempts before account lockout",
      status: "Active",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "IP Whitelisting",
      description: "Restrict access to specific IP addresses",
      status: "Inactive",
      lastUpdated: "2024-01-05"
    }
  ];

  const recentSecurityEvents = [
    {
      id: 1,
      type: "Login",
      user: "admin@example.com",
      ip: "192.168.1.100",
      location: "Mumbai, India",
      time: "2 hours ago",
      status: "Success"
    },
    {
      id: 2,
      type: "Failed Login",
      user: "unknown@example.com",
      ip: "203.0.113.1",
      location: "Unknown",
      time: "4 hours ago",
      status: "Blocked"
    },
    {
      id: 3,
      type: "Password Change",
      user: "manager@example.com",
      ip: "192.168.1.101",
      location: "Mumbai, India",
      time: "1 day ago",
      status: "Success"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-green-600';
      case 'Blocked': return 'text-red-600';
      case 'Active': return 'text-green-600';
      case 'Inactive': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Blocked':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Security Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security Policies</h3>
              {securitySettings.map((setting) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{setting.title}</h4>
                    <Badge variant={setting.status === 'Active' ? 'default' : 'secondary'}>
                      {setting.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                  <p className="text-xs text-gray-500">Last updated: {setting.lastUpdated}</p>
                </motion.div>
              ))}
            </div>

            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium">Enable 2FA for all users</h4>
                  <p className="text-sm text-gray-600">Require additional verification for login</p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </div>

            {/* Session Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Session Management</h3>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                  min="5"
                  max="480"
                />
                <p className="text-xs text-gray-500">Users will be automatically logged out after this period of inactivity</p>
              </div>
            </div>

            {/* Recent Security Events */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Security Events</h3>
              <div className="space-y-3">
                {recentSecurityEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(event.status)}
                        <div>
                          <p className="text-sm font-medium">{event.type}</p>
                          <p className="text-xs text-gray-600">{event.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.ip}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{event.time}</span>
                      <span className={`text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Lock className="h-4 w-4 mr-2" />
                Update Security Settings
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SecurityPopup;
