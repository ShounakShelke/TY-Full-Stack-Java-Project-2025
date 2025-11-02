import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AddMaintenanceJobPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    issue: "",
    priority: "",
    assignedMechanic: "",
    description: "",
    deadline: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { addMaintenanceJob } = await import("../../api/maintenance");
      const res = await addMaintenanceJob(formData);
      if (!res.error) {
        console.log("Maintenance job added:", res);
        // Reset form
        setFormData({
          vehicleId: "",
          issue: "",
          priority: "",
          assignedMechanic: "",
          description: "",
          deadline: "",
        });
        // Call onClose with a flag to refresh the dashboard
        if (onClose) {
          onClose(true); // Pass true to indicate successful addition
        }
      } else {
        console.error("Error adding maintenance job:", res.error);
        alert("Failed to add maintenance job: " + res.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add maintenance job. Please try again.");
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
              <h2 className="text-2xl font-montserrat font-bold">Add Maintenance Job</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Vehicle Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">Vehicle ID *</Label>
                  <Input
                    id="vehicleId"
                    placeholder="e.g., VEH001"
                    value={formData.vehicleId}
                    onChange={(e) => handleInputChange("vehicleId", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedMechanic">Assigned Mechanic *</Label>
                  <Input
                    id="assignedMechanic"
                    placeholder="e.g., John Doe"
                    value={formData.assignedMechanic}
                    onChange={(e) => handleInputChange("assignedMechanic", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Issue */}
              <div className="space-y-2">
                <Label htmlFor="issue">Issue *</Label>
                <Input
                  id="issue"
                  placeholder="e.g., Brake pads need replacement"
                  value={formData.issue}
                  onChange={(e) => handleInputChange("issue", e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional details about the maintenance job..."
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
                <Button type="submit" className="flex-1 bg-mechanic hover:bg-mechanic/90">
                  Add Maintenance Job
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
