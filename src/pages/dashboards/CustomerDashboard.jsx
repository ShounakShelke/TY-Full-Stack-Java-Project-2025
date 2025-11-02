import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Award, MessageSquare, LogOut, Eye, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getBookings, deleteBooking } from "../../api/bookings";
import { getCarById } from "../../api/cars";



export const CustomerDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    setError("");
    try {
      const result = await getBookings();
      if (result.error) {
        setError(result.error);
      } else {
        // Filter bookings for current user
        const userBookings = Array.isArray(result) 
          ? result.filter(b => b.userId === user?.id || b.customerEmail === user?.email)
          : [];
        setBookings(userBookings);
        
        // Fetch car details for each booking
        const carPromises = userBookings.map(async (booking) => {
          if (booking.carId) {
            const car = await getCarById(booking.carId);
            if (!car.error) {
              return { [booking.carId]: car };
            }
          }
          return {};
        });
        const carResults = await Promise.all(carPromises);
        const carsMap = Object.assign({}, ...carResults);
        setCars(carsMap);
      }
    } catch (e) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(bookingId) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const result = await deleteBooking(bookingId);
      if (!result.error) {
        await fetchBookings();
      } else {
        alert("Failed to delete booking: " + result.error);
      }
    } catch (error) {
      alert("Failed to delete booking");
    }
  }

  const stats = [
    { 
      label: "Active Rentals", 
      value: bookings.filter(b => b.status === "Confirmed" || b.status === "Active").length.toString(),
      icon: Car, 
      color: "customer" 
    },
    { 
      label: "Total Bookings", 
      value: bookings.length.toString(), 
      icon: Calendar, 
      color: "customer" 
    },
    { label: "Loyalty Points", value: "1,250", icon: Award, color: "secondary" },
  ];

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;





  return (
    <div className="min-h-screen bg-background theme-customer">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold">Customer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your rental overview.</p>
          </div>
          <Badge variant="secondary" className="bg-customer/10 text-customer border-customer/20">
            Gold Member
          </Badge>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-montserrat font-bold">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                            <IconComponent className={`h-6 w-6 text-${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Your current and upcoming car bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No bookings yet. Start by booking a car!</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => navigate("/cars")}
                      >
                        Browse Cars
                      </Button>
                    </div>
                  ) : (
                    bookings.map((booking) => {
                      const car = cars[booking.carId];
                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-customer/10 rounded-full flex items-center justify-center">
                                <Car className="h-6 w-6 text-customer" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">
                                  {car ? `${car.make} ${car.model}` : `Car ID: ${booking.carId}`}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {booking.pickupLocation || "Location not specified"}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                                    {booking.status || "Pending"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs font-semibold text-primary">
                                    ₹{booking.totalAmount || 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/booking/${booking.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(booking.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Support Chat
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Loyalty Status</CardTitle>
                <CardDescription>Gold Member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Points to Platinum</span>
                    <span>750 more</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-customer h-2 rounded-full transition-all duration-500"
                      style={{ width: '62%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Earn 2x points on weekend bookings
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>


    </div>
  );
};
