import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, User, Shield, Ban, CheckCircle, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listUsers, deleteUser, updateUser } from "../../api/users";

export const UserManagementPopup = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const result = await listUsers();
      if (result.error) {
        setError(result.error);
      } else {
        // Map API response to UI format
        const mappedUsers = Array.isArray(result) ? result.map(u => ({
          id: u.id,
          name: u.username || u.name || "N/A",
          email: u.email,
          role: u.role || "customer",
          status: u.status || "active",
          joinDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A",
          lastActive: u.lastActive || "N/A"
        })) : [];
        setUsers(mappedUsers);
      }
    } catch (e) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const result = await deleteUser(userId);
      if (!result.error) {
        await fetchUsers();
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError("Failed to delete user");
    }
  }

  async function handleRoleChange(userId, newRole) {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      const result = await updateUser({ ...user, role: newRole });
      if (!result.error) {
        await fetchUsers();
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError("Failed to update user role");
    }
  }

  async function handleStatusChange(userId, newStatus) {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      const result = await updateUser({ ...user, status: newStatus });
      if (!result.error) {
        await fetchUsers();
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError("Failed to update user status");
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin": return <Shield className="h-4 w-4" />;
      case "vendor": return <User className="h-4 w-4" />;
      case "mechanic": return <AlertTriangle className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "suspended": return "bg-red-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-montserrat font-bold">User Management</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="mechanic">Mechanic</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading users...</p>
                </div>
              ) : (
                <>
                  {/* Users List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          {getRoleIcon(user.role)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {user.role}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                              <span className="text-xs text-muted-foreground capitalize">{user.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Joined: {user.joinDate}</p>
                          <p>Last active: {user.lastActive}</p>
                        </div>

                        <div className="flex gap-2">
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleRoleChange(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="customer">Customer</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="mechanic">Mechanic</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={user.status}
                            onValueChange={(value) => handleStatusChange(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  Active
                                </div>
                              </SelectItem>
                              <SelectItem value="suspended">
                                <div className="flex items-center gap-2">
                                  <Ban className="h-4 w-4 text-red-500" />
                                  Suspend
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                    ))}
                  </div>

                  {filteredUsers.length === 0 && !loading && (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No users found matching your criteria.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-end gap-4 p-6 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
