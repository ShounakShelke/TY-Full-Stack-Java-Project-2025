import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, TrendingUp, DollarSign, Users, Plus, Edit, LogOut, Calendar, MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddVehiclePopup } from "@/components/popups/AddVehiclePopup";
import { EditVehiclePopup } from "@/components/popups/EditVehiclePopup";
import { MessagePopup } from "@/components/popups/MessagePopup";
import { getDashboard } from "../../api/dashboard";
import { getVehicles, deleteVehicle, addVehicle, updateVehicle } from "../../api/cars";
import { getBookings } from "../../api/bookings";
import { useAuth } from "../../context/AuthContext";

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


export const ManagerDashboard = () => {
  const { logout } = useAuth();
  const [showAddVehiclePopup, setShowAddVehiclePopup] = useState(false);
  const [showEditVehiclePopup, setShowEditVehiclePopup] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchDashboard();
    fetchVehiclesAndBookings();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setErr("");
    try {
      const data = await getDashboard("manager");
      // Ensure stats is an array with proper structure
      const safeStats = Array.isArray(data?.stats) ? data.stats.filter(s => s && s.label) : [];
      // If no stats, provide defaults
      if (safeStats.length === 0) {
        safeStats.push(
          { label: "Total Vehicles", value: "0" },
          { label: "Active Rentals", value: "0" },
          { label: "Revenue", value: "₹0" },
          { label: "Growth", value: "0%" }
        );
      }
      setStats(safeStats);
      setRecentBookings(Array.isArray(data?.recentBookings) ? data.recentBookings.filter(b => b) : []);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
      setErr((e && e.message) || "Failed to load dashboard");
      // Set default stats on error
      setStats([
        { label: "Total Vehicles", value: "0" },
        { label: "Active Rentals", value: "0" },
        { label: "Revenue", value: "₹0" },
        { label: "Growth", value: "0%" }
      ]);
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchVehiclesAndBookings() {
    try {
      const [vehiclesRes, bookingsRes] = await Promise.all([
        getVehicles(),
        getBookings()
      ]);
      setVehicles(Array.isArray(vehiclesRes) ? vehiclesRes.filter(v => v) : []);
      setAllBookings(Array.isArray(bookingsRes) ? bookingsRes.filter(b => b) : []);
    } catch (e) {
      console.error("Failed to fetch vehicles/bookings:", e);
      setVehicles([]);
      setAllBookings([]);
    }
  }

  const getVehicleBookings = (vehicleId) => {
    if (!Array.isArray(allBookings) || !vehicleId) return [];
    return allBookings.filter(b => b && (b.carId === vehicleId || b.vehicleId === vehicleId || b.carId?.toString() === vehicleId?.toString()));
  };

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
            <Button className="bg-vendor hover:bg-vendor/90" onClick={() => setShowMessagePopup(true)}>
              <MessageSquare className="h-4 w-4 mr-2" /> Send a Message
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.isArray(stats) && stats.length > 0 ? stats.filter(s => s && s.label).map((stat, index) => {
            const IconComponent = statIcons[index] || Car;
            const color = statColors[index] || "manager";
            return (
              <motion.div key={stat.label || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }} whileHover={{ y: -5 }}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
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
          {/* Vehicles with Bookings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Car className="h-5 w-5 text-vendor" />Vehicles & Bookings</CardTitle>
                <CardDescription>Manage your vehicle fleet and view bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {vehicles.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No vehicles found. Add a vehicle to get started.</p>
                    </div>
                  ) : (
                    vehicles.filter(v => v).map((vehicle) => {
                      const vehicleBookings = getVehicleBookings(vehicle?.id);
                      return (
                        <motion.div 
                          key={vehicle.id} 
                          whileHover={{ scale: 1.01 }} 
                          className="p-4 rounded-lg border border-border hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">
                                {vehicle?.make || "Unknown"} {vehicle?.model || ""} {vehicle?.year ? `(${vehicle.year})` : ""}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <p className="text-sm text-muted-foreground">Daily Rate: ₹{vehicle?.price || "N/A"}</p>
                                {vehicle?.licensePlate && (
                                  <p className="text-sm text-muted-foreground">• License Plate: {vehicle.licensePlate}</p>
                                )}
                                {vehicle?.carNumber && (
                                  <p className="text-sm text-muted-foreground">• Car Number: {vehicle.carNumber}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={() => {
                                  setEditingVehicle(vehicle);
                                  setShowEditVehiclePopup(true);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-1" />Edit
                              </Button>
                              {vehicle?.id && (
                                <Button size="sm" variant="destructive" onClick={async () => {
                                  if (window.confirm("Are you sure you want to delete this vehicle?")) {
                                    const res = await deleteVehicle(vehicle.id);
                                    if (!res.error) await fetchVehiclesAndBookings();
                                  }
                                }}>
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Bookings Section for this Vehicle */}
                          <div className="mt-4 pt-4 border-t">
                            <h5 className="font-medium mb-3 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Bookings ({vehicleBookings.length})
                            </h5>
                            {vehicleBookings.length === 0 ? (
                              <p className="text-sm text-muted-foreground">No bookings for this vehicle</p>
                            ) : (
                              <div className="space-y-2">
                                {vehicleBookings.filter(b => b && b.id).map((booking) => (
                                  <div key={booking.id} className="p-3 bg-muted/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Badge variant={booking?.status === "Confirmed" ? "default" : "outline"}>
                                            {booking?.status || "Pending"}
                                          </Badge>
                                          <span className="text-sm text-muted-foreground">
                                            Booking #{booking?.id || "N/A"}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                          {booking?.startDate && (
                                            <span className="flex items-center gap-1">
                                              <Calendar className="h-3 w-3" />
                                              {new Date(booking.startDate).toLocaleDateString()} - {booking?.endDate ? new Date(booking.endDate).toLocaleDateString() : "N/A"}
                                            </span>
                                          )}
                                          {booking?.pickupLocation && (
                                            <span className="flex items-center gap-1">
                                              <MapPin className="h-3 w-3" />
                                              {booking.pickupLocation}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <AddVehiclePopup 
          isOpen={showAddVehiclePopup} 
          onClose={async () => {
            setShowAddVehiclePopup(false);
            await fetchVehiclesAndBookings();
          }} 
        />
        <EditVehiclePopup
          isOpen={showEditVehiclePopup}
          vehicle={editingVehicle}
          onClose={async (refresh) => {
            setShowEditVehiclePopup(false);
            setEditingVehicle(null);
            if (refresh) {
              await fetchVehiclesAndBookings();
            }
          }}
        />
        {showMessagePopup && (
          <MessagePopup isOpen={showMessagePopup} onClose={() => setShowMessagePopup(false)} role="manager" />
        )}
      </div>
    </div>
  );
};
