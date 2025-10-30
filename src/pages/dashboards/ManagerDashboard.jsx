import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, TrendingUp, DollarSign, Users, Plus, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddVehiclePopup } from "@/components/popups/AddVehiclePopup";
import { getDashboard } from "../../api/dashboard";
import { getVehicles, deleteVehicle, addVehicle, updateVehicle } from "../../api/cars";

function VehicleModal({ open, onClose, onSave, vehicle }) {
  const [form, setForm] = useState(vehicle || { make: "", model: "", year: "", price: "" });
  useEffect(() => { setForm(vehicle || { make: "", model: "", year: "", price: "" }); }, [vehicle, open]);
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
        <h2 className="text-lg font-bold mb-4">{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>
        <input required name="make" value={form.make} onChange={handleChange} placeholder="Make" className="mb-2 w-full border p-2 rounded" />
        <input required name="model" value={form.model} onChange={handleChange} placeholder="Model" className="mb-2 w-full border p-2 rounded" />
        <input required name="year" value={form.year} onChange={handleChange} type="number" min="1900" max="2100" placeholder="Year" className="mb-2 w-full border p-2 rounded" />
        <input required name="price" value={form.price} onChange={handleChange} type="number" min="0" placeholder="Price" className="mb-4 w-full border p-2 rounded" />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{vehicle ? "Save" : "Add"}</Button>
        </div>
      </form>
    </div>
  );
}

function VehicleInventoryPanel() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    setErr("");
    const res = await getVehicles();
    if(res.error) setErr(res.error); else setVehicles(res);
    setLoading(false);
  }
  async function handleDelete(id) {
    const res = await deleteVehicle(id); 
    if(!res.error) load();
  }
  function openAdd() { setEditVehicle(null); setModalOpen(true); }
  function openEdit(v) { setEditVehicle(v); setModalOpen(true); }
  async function handleSave(car) {
    if (editVehicle && car.id) await updateVehicle({ ...editVehicle, ...car });
    else await addVehicle(car);
    await load();
  }
  if (loading) return <div className="p-4">Loading vehicles...</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-xl">Inventory</h2>
        <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead><tr><th>ID</th><th>Make</th><th>Model</th><th>Year</th><th>Price</th><th></th></tr></thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id} className="border-b">
              <td>{v.id}</td><td>{v.make}</td><td>{v.model}</td><td>{v.year}</td><td>₹{v.price}</td>
              <td>
                <Button size="sm" className="mr-1" variant="secondary" onClick={() => openEdit(v)}><Edit className="h-4 w-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(v.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VehicleModal open={modalOpen} onClose={() => setModalOpen(false)} vehicle={editVehicle} onSave={handleSave} />
    </div>
  );
}

export const ManagerDashboard = () => {
  const [showAddVehiclePopup, setShowAddVehiclePopup] = useState(false);
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setErr("");
    try {
      const data = await getDashboard("manager");
      setStats(data.stats || []);
      setRecentBookings(data.recentBookings || []);
    } catch (e) {
      setErr((e && e.message) || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  // map to icons/colors
  const statIcons = [Car, Users, DollarSign, TrendingUp];
  const statColors = ["manager", "manager", "manager", "secondary"];

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;

  return (
    <div className="min-h-screen bg-background theme-manager">
      {/* Header */}
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">Manager Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your vehicle fleet and track performance</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-vendor hover:bg-vendor/90" onClick={() => setShowAddVehiclePopup(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Vehicle
            </Button>
          </div>
        </div>
      </motion.header>
      <div className="p-6">
        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = statIcons[index] || Car;
            const color = statColors[index] || "manager";
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }} whileHover={{ y: -5 }}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <IconComponent className={`h-4 w-4 text-${color}`} />
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
          {/* Recent Bookings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-vendor" />Recent Bookings</CardTitle>
                <CardDescription>Latest rental activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.length === 0 ? <span>No recent bookings.</span> : recentBookings.map((booking) => (
                    <motion.div key={booking.id} whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold">{booking.customer}</h4>
                          <Badge
                            variant={booking.status === "Confirmed" ? "default" : booking.status === "In Progress" ? "secondary" : "outline"}
                            className={booking.status === "Confirmed" ? "bg-vendor text-white" : booking.status === "In Progress" ? "bg-orange-500 text-white" : ""}
                          >{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.car} • {booking.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-vendor">{booking.amount}</p>
                        <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4"><Button variant="outline" className="w-full">View All Bookings</Button></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <AddVehiclePopup isOpen={showAddVehiclePopup} onClose={() => setShowAddVehiclePopup(false)} />
        <VehicleInventoryPanel />
      </div>
    </div>
  );
};
