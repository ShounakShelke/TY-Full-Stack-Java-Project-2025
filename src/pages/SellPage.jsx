import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Car, IndianRupee, Calendar, Fuel, Settings, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    kmDriven: "",
    fuelType: "",
    transmission: "",
    location: "",
    price: "",
    description: "",
    ownerType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Car Listed Successfully!",
      description: "Your car has been listed for sale. Our team will review and contact you soon.",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-12 bg-gradient-primary"
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-montserrat font-bold mb-6">
              Sell Your Car
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get the best price for your car with CarCircle. List your vehicle and connect with genuine buyers across India.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Listing Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-montserrat mb-4">List Your Car</CardTitle>
                  <CardDescription className="text-lg">
                    Fill in the details below to list your car for sale
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="brand" className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          Brand
                        </Label>
                        <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                            <SelectItem value="hyundai">Hyundai</SelectItem>
                            <SelectItem value="tata">Tata</SelectItem>
                            <SelectItem value="mahindra">Mahindra</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="kia">Kia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          placeholder="Enter model name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Year
                        </Label>
                        <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kmDriven">KM Driven</Label>
                        <Input
                          id="kmDriven"
                          value={formData.kmDriven}
                          onChange={(e) => handleInputChange("kmDriven", e.target.value)}
                          placeholder="Enter kilometers driven"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelType" className="flex items-center gap-2">
                          <Fuel className="h-4 w-4" />
                          Fuel Type
                        </Label>
                        <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="cng">CNG</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transmission" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Transmission
                        </Label>
                        <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Enter your city"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Expected Price (₹)
                        </Label>
                        <Input
                          id="price"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="Enter expected price"
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-2">
                      <Label htmlFor="ownerType">Owner Type</Label>
                      <Select value={formData.ownerType} onValueChange={(value) => handleInputChange("ownerType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select owner type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">First Owner</SelectItem>
                          <SelectItem value="second">Second Owner</SelectItem>
                          <SelectItem value="third">Third Owner</SelectItem>
                          <SelectItem value="fourth">Fourth Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your car's condition, features, and any additional details..."
                        rows={4}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Photos
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">Upload Car Photos</p>
                        <p className="text-muted-foreground">Drag and drop or click to select images</p>
                        <p className="text-sm text-muted-foreground mt-2">Upload up to 10 photos (JPG, PNG)</p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      List My Car
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold mb-4">Why Sell With CarCircle?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the best value for your car with our trusted platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Price Guaranteed",
                description: "Get competitive offers from verified buyers across India",
                icon: IndianRupee
              },
              {
                title: "Quick & Easy Process",
                description: "List your car in minutes and get instant responses",
                icon: Car
              },
              {
                title: "Safe & Secure",
                description: "All transactions are secure with verified buyer profiles",
                icon: Settings
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellPage;
