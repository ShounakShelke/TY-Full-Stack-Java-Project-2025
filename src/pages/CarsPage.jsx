import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCars } from "../api/cars";
import { motion } from "framer-motion";
import { Car, Filter, MapPin, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";

const CarsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("rent");
  const [filters, setFilters] = useState({ category: "all", location: "all" });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllCars()
      .then(setCars)
      .catch((err) => setError(err.message || "Could not load cars."))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { id: "rent", label: "For Rent", icon: Car }
  ];

  const filteredCars = cars.filter(car => {
    if (!car) return false;
    
    // Filter by category if not "all"
    if (filters.category !== "all") {
      const carType = (car.type || car.category || "").toLowerCase();
      if (carType !== filters.category.toLowerCase()) {
        return false;
      }
    }
    
    // Filter by location if not "all"
    if (filters.location !== "all") {
      const carLocation = (car.location || "").toLowerCase();
      if (carLocation !== filters.location.toLowerCase()) {
        return false;
      }
    }
    
    return true;
  });

  if (loading) return <div className="p-8 text-center">Loading cars...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

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

      {/* Category Tabs - Removed For Sale */}

      {/* Filters - keep/skip logic since cars API doesn't support advanced filter */}
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
                        src={car.image || car.imageUrl || `https://source.unsplash.com/400x300/?car,${car.make || 'car'}`}
                        alt={car.make + " " + car.model}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = `https://source.unsplash.com/400x300/?car`;
                        }}
                      />
                      <Badge className="absolute top-3 left-3 bg-green-500">
                        Available
                      </Badge>
                      <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{car.make} {car.model}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Mumbai
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.5</span>
                          <span className="text-xs text-muted-foreground">(23)</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {car.year}
                          </Badge>
                        </div>
                        {/* Display more info as needed */}
                        <div className="flex justify-end items-center pt-4 border-t border-border">
                          <Button onClick={() => navigate(`/cars/${car.id}`)}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarsPage;
