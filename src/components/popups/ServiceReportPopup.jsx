import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ServiceReportPopup = ({ isOpen, onClose }) => {
  const [reportData, setReportData] = useState({
    serviceDetails: "",
    reportFile: null,
  });

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setReportData(prev => ({ ...prev, reportFile: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle service report submission logic here
    console.log("Service report data:", reportData);
    onClose();
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
            className="bg-background rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-montserrat font-bold">Service Report</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="serviceDetails">Service Details *</Label>
                <Textarea
                  id="serviceDetails"
                  placeholder="Describe the service performed"
                  value={reportData.serviceDetails}
                  onChange={(e) => handleInputChange("serviceDetails", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportFile">Upload Report (PDF)</Label>
                <input
                  id="reportFile"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Label htmlFor="reportFile">
                  <Button type="button" variant="outline" asChild>
                    <span><Upload className="inline-block mr-2" /> Choose PDF</span>
                  </Button>
                </Label>
                {reportData.reportFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {reportData.reportFile.name}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-vendor hover:bg-vendor/90">
                  Submit Report
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
