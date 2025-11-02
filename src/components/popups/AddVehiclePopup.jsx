import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Car, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AddVehiclePopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    dailyRate: "",
    description: "",
    image: null,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { addVehicle } = await import("../../api/cars");
      const res = await addVehicle({
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseFloat(formData.dailyRate),
        color: formData.color,
        licensePlate: formData.licensePlate,
        description: formData.description,
        forRent: true,
        forSale: false
      });
      if (!res.error) {
        console.log("Vehicle added:", res);
        alert("Vehicle added successfully!");
        // Reset form
        setFormData({
          make: "",
          model: "",
          year: "",
          color: "",
          licensePlate: "",
          dailyRate: "",
          description: "",
          image: null,
        });
        onClose();
      } else {
        console.error("Error adding vehicle:", res.error);
        alert("Failed to add vehicle: " + res.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-montserrat font-bold">Add New Vehicle</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Vehicle Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Upload a high-quality image of your vehicle
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="vehicle-image"
                    />
                    <Label htmlFor="vehicle-image">
                      <Button type="button" variant="outline" asChild>
                        <span>Choose Image</span>
                      </Button>
                    </Label>
                    {formData.image && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input
                    id="make"
                    placeholder="e.g., Honda, BMW, Toyota"
                    value={formData.make}
                    onChange={(e) => handleInputChange("make", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="e.g., City, X3, Camry"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Select onValueChange={(value) => handleInputChange("year", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color *</Label>
                  <Input
                    id="color"
                    placeholder="e.g., White, Black, Silver"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate *</Label>
                  <Input
                    id="licensePlate"
                    placeholder="e.g., MH 01 AB 1234"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Daily Rate (₹) *</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    placeholder="e.g., 1500"
                    value={formData.dailyRate}
                    onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about the vehicle..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-vendor hover:bg-vendor/90">
                  Add Vehicle
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
