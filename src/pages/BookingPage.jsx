import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Car, CreditCard, User, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    carId: "1",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    dropoffTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    driverLicense: "",
    additionalServices: []
  });

  const steps = [
    { id: 1, title: "Select Dates", icon: Calendar },
    { id: 2, title: "Add Details", icon: User },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Confirmation", icon: Shield }
  ];

  const selectedCar = {
    id: 1,
    name: "BMW X5",
    type: "Luxury SUV",
    price: 8500,
    image: "/placeholder.svg",
    features: ["Automatic", "Petrol", "5 Seats", "GPS", "Insurance"],
    rating: 4.8,
    reviews: 124,
    owner: "Premium Motors"
  };

  const additionalServices = [
    { id: "fuel", name: "Fuel Package", price: 499, description: "Unlimited fuel for your trip" },
    { id: "driver", name: "Professional Driver", price: 1999, description: "Experienced chauffeur service" },
    { id: "gps", name: "GPS & Accessories", price: 199, description: "Navigation and travel kit" },
    { id: "insurance", name: "Premium Insurance", price: 299, description: "Zero deductible coverage" }
  ];

  const handleServiceToggle = (serviceId) => {
    setBookingData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const calculateTotal = () => {
    const basePrice = selectedCar.price;
    const servicesTotal = bookingData.additionalServices.reduce((sum, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    const taxes = (basePrice + servicesTotal) * 0.18;
    return basePrice + servicesTotal + taxes;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-8 bg-gradient-primary"
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl font-montserrat font-bold mb-4">
              Complete Your Booking
            </h1>
            <p className="text-lg opacity-90">
              Just a few steps to get you on the road
            </p>
          </div>
        </div>
      </motion.section>

      {/* Progress Steps */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className={`font-medium ${
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Select Rental Dates
                    </CardTitle>
                    <CardDescription>
                      Choose your pickup and drop-off dates and locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pickup Date</label>
                        <Input
                          type="date"
                          value={bookingData.pickupDate}
                          onChange={(e) => setBookingData(prev => ({...prev, pickupDate: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pickup Time</label>
                        <Input
                          type="time"
                          value={bookingData.pickupTime}
                          onChange={(e) => setBookingData(prev => ({...prev, pickupTime: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Drop-off Date</label>
                        <Input
                          type="date"
                          value={bookingData.dropoffDate}
                          onChange={(e) => setBookingData(prev => ({...prev, dropoffDate: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Drop-off Time</label>
                        <Input
                          type="time"
                          value={bookingData.dropoffTime}
                          onChange={(e) => setBookingData(prev => ({...prev, dropoffTime: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pickup Location</label>
                        <Input
                          placeholder="Enter pickup address"
                          value={bookingData.pickupLocation}
                          onChange={(e) => setBookingData(prev => ({...prev, pickupLocation: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Drop-off Location</label>
                        <Input
                          placeholder="Enter drop-off address"
                          value={bookingData.dropoffLocation}
                          onChange={(e) => setBookingData(prev => ({...prev, dropoffLocation: e.target.value}))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Personal Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Driver's License</label>
                          <Input
                            placeholder="License number"
                            value={bookingData.driverLicense}
                            onChange={(e) => setBookingData(prev => ({...prev, driverLicense: e.target.value}))}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Emergency Contact</label>
                          <Input placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Services</CardTitle>
                      <CardDescription>
                        Enhance your rental experience with these optional services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {additionalServices.map((service) => (
                          <div
                            key={service.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              bookingData.additionalServices.includes(service.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground"
                            }`}
                            onClick={() => handleServiceToggle(service.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">₹{service.price}/day</p>
                                <input
                                  type="checkbox"
                                  checked={bookingData.additionalServices.includes(service.id)}
                                  onChange={() => {}}
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="col-span-1">
                        UPI
                      </Button>
                      <Button variant="outline" className="col-span-1">
                        Card
                      </Button>
                      <Button variant="outline" className="col-span-1">
                        Wallet
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">CVV</label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Booking Confirmed!
                    </CardTitle>
                    <CardDescription>
                      Your booking has been successfully confirmed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-center">
                    <div className="text-6xl">🎉</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Booking ID: BK123456</h3>
                      <p className="text-muted-foreground">
                        Check your email for detailed booking information and pickup instructions
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button>Download Receipt</Button>
                      <Button variant="outline">View Booking</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                disabled={currentStep === 4}
              >
                {currentStep === 3 ? "Complete Booking" : "Continue"}
              </Button>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Car */}
                  <div className="space-y-3">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedCar.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCar.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{selectedCar.rating}</span>
                        <span className="text-xs text-muted-foreground">({selectedCar.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-2">Included Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCar.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between">
                      <span>Base Rental (1 day)</span>
                      <span>₹{selectedCar.price}</span>
                    </div>

                    {bookingData.additionalServices.map(serviceId => {
                      const service = additionalServices.find(s => s.id === serviceId);
                      return service ? (
                        <div key={serviceId} className="flex justify-between text-sm">
                          <span>{service.name}</span>
                          <span>₹{service.price}</span>
                        </div>
                      ) : null;
                    })}

                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees (18%)</span>
                      <span>₹{Math.round((selectedCar.price + bookingData.additionalServices.reduce((sum, serviceId) => {
                        const service = additionalServices.find(s => s.id === serviceId);
                        return sum + (service?.price || 0);
                      }, 0)) * 0.18)}</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{Math.round(calculateTotal())}</span>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Secure Booking</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is encrypted and secure.
                      Free cancellation up to 24 hours before pickup.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
