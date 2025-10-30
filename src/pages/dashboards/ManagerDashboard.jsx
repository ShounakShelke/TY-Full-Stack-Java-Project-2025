import { useState } from "react";
import { motion } from "framer-motion";
import { Car, TrendingUp, DollarSign, Users, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddVehiclePopup } from "@/components/popups/AddVehiclePopup";

export const ManagerDashboard = () => {
  const [showAddVehiclePopup, setShowAddVehiclePopup] = useState(false);

  const stats = [
    { label: "Total Fleet", value: "24", icon: Car, color: "manager", trend: "+2 this month" },
    { label: "Active Rentals", value: "18", icon: Users, color: "manager", trend: "75% utilization" },
    { label: "Monthly Revenue", value: "₹1,85,000", icon: DollarSign, color: "manager", trend: "+12% vs last month" },
    { label: "Average Rating", value: "4.8", icon: TrendingUp, color: "secondary", trend: "96% satisfaction" },
  ];

  const fleetStatus = [
    { type: "Available", count: 6, color: "bg-green-500" },
    { type: "Rented", count: 18, color: "bg-manager" },
    { type: "Maintenance", count: 0, color: "bg-orange-500" },
  ];

  const recentBookings = [
    { id: 1, customer: "Shounak Shelke", car: "Honda City", duration: "3 days", amount: "₹4,500", status: "Confirmed" },
    { id: 2, customer: "Sahil Kanchan", car: "BMW X1", duration: "1 week", amount: "₹12,600", status: "In Progress" },
    { id: 3, customer: "Shivam Bhosle", car: "Maruti Swift", duration: "2 days", amount: "₹2,400", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background theme-manager">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">
              Manager Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your vehicle fleet and track performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-vendor hover:bg-vendor/90" onClick={() => setShowAddVehiclePopup(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
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
          {/* Fleet Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-vendor" />
                  Fleet Status
                </CardTitle>
                <CardDescription>
                  Real-time fleet utilization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fleetStatus.map((status) => (
                  <div key={status.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                      <span className="font-medium">{status.type}</span>
                    </div>
                    <Badge variant="secondary">{status.count}</Badge>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    View All Vehicles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-vendor" />
                  Recent Bookings
                </CardTitle>
                <CardDescription>
                  Latest rental activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold">{booking.customer}</h4>
                          <Badge
                            variant={
                              booking.status === "Confirmed" ? "default" :
                              booking.status === "In Progress" ? "secondary" :
                              "outline"
                            }
                            className={
                              booking.status === "Confirmed" ? "bg-vendor text-white" :
                              booking.status === "In Progress" ? "bg-orange-500 text-white" :
                              ""
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.car} • {booking.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-vendor">{booking.amount}</p>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Bookings
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowAddVehiclePopup(true)}>
            <CardContent className="p-6 text-center">
              <Plus className="h-8 w-8 text-vendor mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Add New Vehicle</h3>
              <p className="text-sm text-muted-foreground">Expand your fleet</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-vendor mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">View detailed reports</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-vendor mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Payments</h3>
              <p className="text-sm text-muted-foreground">Manage payouts</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Popup */}
      <AddVehiclePopup
        isOpen={showAddVehiclePopup}
        onClose={() => setShowAddVehiclePopup(false)}
      />
    </div>
  );
};
