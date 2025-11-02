import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Users, BarChart3, AlertCircle, Activity, Edit, Plus, LogOut, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserManagementPopup } from "@/components/popups/UserManagementPopup";
import SecurityPopup from "@/components/SecurityPopup";
import { MessagePopup } from "@/components/popups/MessagePopup";
import { getDashboard } from "../../api/dashboard";
import { listUsers, deleteUser, updateUser, createUser } from "../../api/users";
import { useAuth } from "../../context/AuthContext";

function UserModal({ open, onClose, onSave, user }) {
  const [form, setForm] = useState(user || { username: "", email: "", password: "", role: "customer" });
  useEffect(() => { setForm(user || { username: "", email: "", password: "", role: "customer" }); }, [user, open]);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <input required name="username" value={form.username} onChange={handleChange} placeholder="Username" className="mb-2 w-full border p-2 rounded" />
        <input required name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="mb-2 w-full border p-2 rounded" />
        {!user && (<input required name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="mb-2 w-full border p-2 rounded" />)}
        <select name="role" value={form.role} onChange={handleChange} className="mb-4 w-full border p-2 rounded">
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
          <option value="mechanic">Mechanic</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{user ? "Save" : "Add"}</Button>
        </div>
      </form>
    </div>
  );
}

function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    setErr("");
    const res = await listUsers();
    if(res.error) setErr(res.error); else setUsers(res);
    setLoading(false);
  }
  async function handleDelete(id) {
    const res = await deleteUser(id); 
    if(!res.error) load();
  }
  function openAdd() { setEditUser(null); setModalOpen(true); }
  function openEdit(u) { setEditUser(u); setModalOpen(true); }
  async function handleSave(user) {
    if (editUser && user.id) await updateUser({ ...editUser, ...user });
    else await createUser(user);
    await load();
  }
  if (loading) return <div className="p-4">Loading users...</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-xl">User Management</h2>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th></th></tr></thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? users.filter(u => u && u.id).map(u => (
            <tr key={u.id} className="border-b">
              <td>{u.id || "N/A"}</td><td>{u.username || "N/A"}</td><td>{u.email || "N/A"}</td><td>{u.role || "customer"}</td>
              <td>
                <Button size="sm" className="mr-1" variant="secondary" onClick={() => openEdit(u)}><Edit className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)}>Delete</Button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center py-4 text-muted-foreground">No users found</td></tr>
          )}
        </tbody>
      </table>
      <UserModal open={modalOpen} onClose={() => setModalOpen(false)} user={editUser} onSave={handleSave} />
    </div>
  );
}

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const [showUserManagementPopup, setShowUserManagementPopup] = useState(false);
  const [showSecurityPopup, setShowSecurityPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [stats, setStats] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setErr("");
    try {
      const data = await getDashboard("admin");
      // Ensure stats is an array with proper structure
      const safeStats = Array.isArray(data?.stats) ? data.stats.filter(s => s && s.label) : [];
      // If no stats, provide defaults
      if (safeStats.length === 0) {
        safeStats.push(
          { label: "Total Users", value: "0" },
          { label: "Active Sessions", value: "0" },
          { label: "System Health", value: "100%" },
          { label: "Security Alerts", value: "0" }
        );
      }
      setStats(safeStats);
      setAlerts(Array.isArray(data?.alerts) ? data.alerts.filter(a => a) : []);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
      setErr((e && e.message) || "Failed to load dashboard");
      // Set default stats on error
      setStats([
        { label: "Total Users", value: "0" },
        { label: "Active Sessions", value: "0" },
        { label: "System Health", value: "100%" },
        { label: "Security Alerts", value: "0" }
      ]);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }

  // Map to icons/colors
  const statIcons = [Users, Activity, BarChart3, AlertCircle];
  const statColors = ["admin", "admin", "green-500", "orange-500"];

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;

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
            <Button className="bg-admin hover:bg-admin/90" onClick={() => setShowMessagePopup(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send a Message
            </Button>
            <Button className="bg-admin hover:bg-admin/90">
              <Shield className="h-4 w-4 mr-2" />
              Security Center
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
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
          {Array.isArray(stats) && stats.length > 0 ? stats.map((stat, index) => {
            if (!stat || !stat.label) return null;
            const IconComponent = statIcons[index] || Users;
            const color = statColors[index] || "admin";
            return (
              <motion.div
                key={stat.label || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label || "N/A"}
                    </CardTitle>
                    <IconComponent className={`h-4 w-4 text-${color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stat.value || "0"}</div>
                    <p className="text-xs text-muted-foreground">{stat.trend || ""}</p>
                  </CardContent>
              </Card>
            </motion.div>
          );
          }).filter(Boolean) : (
            <div className="col-span-4 text-center py-4 text-muted-foreground">
              No statistics available
            </div>
          )}
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
                {!Array.isArray(alerts) || alerts.length === 0 ? <span>No alerts found.</span> : alerts.filter(a => a).map((alert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border ${alert.type === 'warning' ? 'border-orange-200 bg-orange-50/50' : 'border-blue-200 bg-blue-50/50'}`}
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
                {stats.filter(stat => stat.label.includes('Users') || stat.label.includes('Customers') || stat.label.includes('Managers') || stat.label.includes('Mechanics')).map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-admin h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(parseInt(metric.value) / Math.max(...stats.map(s => parseInt(s.value)))) * 100}%` }}
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
                  {!alerts.length ? <span>No recent activities.</span> : alerts.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${
                        activity.type === 'warning' ? 'orange-500' :
                        'blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
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
        <UserManagementPopup isOpen={showUserManagementPopup} onClose={() => setShowUserManagementPopup(false)} />
      )}
      {showSecurityPopup && (
        <SecurityPopup onClose={() => setShowSecurityPopup(false)} />
      )}
      {showMessagePopup && (
        <MessagePopup isOpen={showMessagePopup} onClose={() => setShowMessagePopup(false)} role="admin" />
      )}

    </div>
  );
};
