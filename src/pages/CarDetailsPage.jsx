import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Car,
  Fuel,
  Calendar,
  MapPin,
  Settings,
  Star,
  Heart,
  Share2,
  ArrowLeft,
  ShoppingCart,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState(null);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: ""
  });

  // Mock car data - in real app, fetch based on id
  const carData = {
    id: id || "1",
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    model: "Swift VXI",
    year: 2022,
    price: 650000,
    rentPrice: 2500,
    location: "Mumbai, Maharashtra",
    kmDriven: 15000,
    fuelType: "Petrol",
    transmission: "Manual",
    owners: 1,
    rating: 4.5,
    reviews: 127,
    availability: "Available",
    images: ["/placeholder.svg"],
    features: [
      "Air Conditioning",
      "Power Steering",
      "Power Windows",
      "ABS with EBD",
      "Dual Airbags",
      "Music System",
      "Central Locking",
      "Alloy Wheels"
    ],
    description: "Well-maintained Maruti Suzuki Swift in excellent condition. Perfect for city driving with great fuel efficiency. All services done at authorized service center.",
    seller: {
      name: "Rajesh Kumar",
      rating: 4.8,
      cars: 3
    }
  };

  const handleBooking = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "Choose whether you want to rent or buy this car.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: `${selectedOption === 'rent' ? 'Rental' : 'Purchase'} Request Sent!`,
      description: `Your request has been sent successfully. We'll contact you soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src={carData.images[0]}
                  alt={carData.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="absolute bottom-4 left-4 bg-green-500 hover:bg-green-600">
                  {carData.availability}
                </Badge>
              </motion.div>

              {/* Car Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-3xl font-montserrat">{carData.name}</CardTitle>
                        <CardDescription className="text-lg mt-2">
                          {carData.brand} • {carData.year} • {carData.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{carData.rating}</span>
                          <span className="text-muted-foreground">({carData.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{carData.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{carData.kmDriven.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{carData.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{carData.transmission}</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {carData.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground">{carData.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-montserrat">Book This Car</CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Rent per day:</span>
                        <span className="text-xl font-bold text-primary">₹{carData.rentPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Buy price:</span>
                        <span className="text-xl font-bold text-primary">₹{carData.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Option Selection */}
                    <div className="space-y-2">
                      <Label>Choose Option</Label>
                      <Select value={selectedOption || ""} onValueChange={(value) => setSelectedOption(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rent or buy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="buy">Buy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedOption === "rent" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={bookingData.startDate}
                              onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={bookingData.endDate}
                              onChange={(e) => setBookingData(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="pickup">Pickup Location</Label>
                          <Input
                            id="pickup"
                            placeholder="Enter pickup location"
                            value={bookingData.pickupLocation}
                            onChange={(e) => setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dropoff">Drop-off Location</Label>
                          <Input
                            id="dropoff"
                            placeholder="Enter drop-off location"
                            value={bookingData.dropoffLocation}
                            onChange={(e) => setBookingData(prev => ({ ...prev, dropoffLocation: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button onClick={handleBooking} className="w-full" size="lg">
                        {selectedOption === "rent" ? (
                          <>
                            <Car className="h-4 w-4 mr-2" />
                            Book for Rent
                          </>
                        ) : selectedOption === "buy" ? (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Buy Now
                          </>
                        ) : (
                          "Select Option First"
                        )}
                      </Button>

                      {selectedOption && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Quick Contact
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Contact Seller</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <h4 className="font-semibold">{carData.seller.name}</h4>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{carData.seller.rating} rating</span>
                                  <span className="text-muted-foreground">• {carData.seller.cars} cars listed</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message">Your Message</Label>
                                <textarea
                                  id="message"
                                  className="w-full p-3 border rounded-md resize-none"
                                  rows={3}
                                  placeholder={`Hi, I'm interested in your ${carData.name} for ${selectedOption}...`}
                                />
                              </div>
                              <Button className="w-full">Send Message</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
