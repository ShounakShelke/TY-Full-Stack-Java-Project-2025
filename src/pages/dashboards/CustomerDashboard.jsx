
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Award, MessageSquare } from "lucide-react";



export const CustomerDashboard = () => {

  const stats = [
    { label: "Active Rentals", value: "2", icon: Car, color: "customer" },
    { label: "Completed Trips", value: "15", icon: Calendar, color: "customer" },
    // Removed Total Spent as payment methods are to be removed
    { label: "Loyalty Points", value: "1,250", icon: Award, color: "secondary" },
  ];

  const activeRentals = [
    {
      id: 1,
      car: "BMW X3",
      pickup: "2024-01-15",
      return: "2024-01-18",
      status: "Active",
      location: "Mumbai Central"
    },
    {
      id: 2,
      car: "Honda City",
      pickup: "2024-01-20",
      return: "2024-01-22",
      status: "Upcoming",
      location: "Pune Airport"
    }
  ];





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

            {/* Active Rentals */}
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
                <CardDescription>Your current and upcoming car rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRentals.map((rental) => (
                    <motion.div
                      key={rental.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-customer/10 rounded-full flex items-center justify-center">
                            <Car className="h-6 w-6 text-customer" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{rental.car}</h3>
                            <p className="text-sm text-muted-foreground">{rental.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={rental.status === "Active" ? "default" : "secondary"}>
                                {rental.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {rental.pickup} - {rental.return}
                              </span>
                            </div>
                          </div>
                        </div>


                      </div>
                    </motion.div>
                  ))}
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
