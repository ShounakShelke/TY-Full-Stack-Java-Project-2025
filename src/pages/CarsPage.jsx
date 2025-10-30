import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Filter, MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";

const CarsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("rent");
  const [filters, setFilters] = useState({
    category: "all",
    location: "all"
  });

  const cars = [
    {
      id: 1,
      name: "BMW X5",
      category: "luxury",
      type: "SUV",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg",
      features: ["Automatic", "Petrol", "5 Seats", "GPS"],
      location: "Mumbai",
      availability: "Available",
      owner: "Premium Motors",
      year: 2023,
      kmDriven: 15000,
      forSale: true,
      forRent: true
    },
    {
      id: 2,
      name: "Honda City",
      category: "sedan",
      type: "Sedan",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      features: ["Manual", "Petrol", "5 Seats", "AC"],
      location: "Delhi",
      availability: "Available",
      owner: "City Rentals",
      year: 2022,
      kmDriven: 25000,
      forSale: true,
      forRent: true
    },
    {
      id: 3,
      name: "Maruti Swift",
      category: "compact",
      type: "Hatchback",
      rating: 4.4,
      reviews: 156,
      image: "/placeholder.svg",
      features: ["Manual", "Petrol", "4 Seats", "AC"],
      location: "Bangalore",
      availability: "Available",
      owner: "Swift Drive",
      year: 2021,
      kmDriven: 35000,
      forSale: true,
      forRent: true
    },
    {
      id: 4,
      name: "Mahindra Thar",
      category: "adventure",
      type: "SUV",
      rating: 4.7,
      reviews: 78,
      image: "/placeholder.svg",
      features: ["Manual", "Diesel", "4 Seats", "4WD"],
      location: "Goa",
      availability: "Available",
      owner: "Adventure Rides",
      year: 2023,
      kmDriven: 8000,
      forSale: true,
      forRent: true
    }
  ];

  const categories = [
    { id: "rent", label: "For Rent", icon: Car },
    { id: "buy", label: "For Sale", icon: Car },
    { id: "sell", label: "Sell Your Car", icon: Heart }
  ];

  const filteredCars = cars.filter(car => {
    if (selectedCategory === "rent" && !car.forRent) return false;
    if (selectedCategory === "buy" && !car.forSale) return false;
    if (filters.category !== "all" && car.category !== filters.category) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-12 bg-gradient-primary"
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-montserrat font-bold mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Rent, buy, or sell cars with ease. Thousands of verified vehicles at your fingertips.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Category Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-8 bg-card border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-6 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 rounded-lg border border-input bg-background"
            >
              <option value="all">All Categories</option>
              <option value="luxury">Luxury</option>
              <option value="sedan">Sedan</option>
              <option value="compact">Compact</option>
              <option value="adventure">Adventure</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="px-4 py-2 rounded-lg border border-input bg-background"
            >
              <option value="all">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Goa">Goa</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {selectedCategory === "sell" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <Car className="h-16 w-16 mx-auto text-primary mb-6" />
              <h2 className="text-3xl font-montserrat font-bold mb-4">Sell Your Car</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the best price for your car. Our platform connects you with verified buyers and provides instant valuations.
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <Button className="w-full" size="lg">
                  Get Instant Valuation
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  List Your Car
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-500">
                        {car.availability}
                      </Badge>
                      <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{car.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {car.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{car.rating}</span>
                          <span className="text-xs text-muted-foreground">({car.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {selectedCategory === "buy" && (
                          <div className="text-sm text-muted-foreground">
                            <p>{car.year} • {car.kmDriven.toLocaleString()} km</p>
                            <p>Owner: {car.owner}</p>
                          </div>
                        )}

                        <div className="flex justify-end items-center pt-4 border-t border-border">
                          <Button>
                            {selectedCategory === "buy" ? "Buy Now" : "Book Now"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CarsPage;
