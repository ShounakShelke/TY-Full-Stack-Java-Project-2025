import { useState } from "react";
import { motion } from "framer-motion";
import { X, FileText, Upload, CheckCircle, AlertTriangle, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceReportPopup = ({ onClose }) => {
  const [reportData, setReportData] = useState({
    serviceType: "",
    vehicleCondition: "",
    workPerformed: "",
    partsUsed: "",
    issuesFound: "",
    recommendations: "",
    nextServiceDate: "",
    laborHours: "",
    partsCost: "",
    laborCost: "",
    totalCost: "",
    customerFeedback: "",
    mechanicNotes: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const parts = parseFloat(reportData.partsCost) || 0;
    const labor = parseFloat(reportData.laborCost) || 0;
    return (parts + labor).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Service report submitted:", { ...reportData, uploadedFiles });
    setIsSubmitting(false);
    onClose();
  };

  const serviceTypes = [
    "Oil Change",
    "Brake Service",
    "Tire Service",
    "Engine Repair",
    "Transmission Service",
    "Electrical System",
    "Air Conditioning",
    "General Maintenance"
  ];

  const vehicleConditions = [
    { value: "excellent", label: "Excellent", color: "bg-green-500" },
    { value: "good", label: "Good", color: "bg-blue-500" },
    { value: "fair", label: "Fair", color: "bg-yellow-500" },
    { value: "poor", label: "Poor", color: "bg-red-500" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-montserrat font-bold text-foreground">
            Service Report
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-mechanic" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select onValueChange={(value) => handleInputChange("serviceType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleCondition">Vehicle Condition *</Label>
                <Select onValueChange={(value) => handleInputChange("vehicleCondition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleConditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${condition.color}`}></div>
                          {condition.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborHours">Labor Hours</Label>
                <Input
                  id="laborHours"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2.5"
                  value={reportData.laborHours}
                  onChange={(e) => handleInputChange("laborHours", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextServiceDate">Next Service Date</Label>
                <Input
                  id="nextServiceDate"
                  type="date"
                  value={reportData.nextServiceDate}
                  onChange={(e) => handleInputChange("nextServiceDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Performed */}
          <Card>
            <CardHeader>
              <CardTitle>Work Performed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workPerformed">Work Description *</Label>
                <Textarea
                  id="workPerformed"
                  placeholder="Describe the work performed in detail..."
                  value={reportData.workPerformed}
                  onChange={(e) => handleInputChange("workPerformed", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partsUsed">Parts Used</Label>
                <Textarea
                  id="partsUsed"
                  placeholder="List all parts used with quantities..."
                  value={reportData.partsUsed}
                  onChange={(e) => handleInputChange("partsUsed", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuesFound">Issues Found</Label>
                <Textarea
                  id="issuesFound"
                  placeholder="Any additional issues discovered..."
                  value={reportData.issuesFound}
                  onChange={(e) => handleInputChange("issuesFound", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  placeholder="Future maintenance recommendations..."
                  value={reportData.recommendations}
                  onChange={(e) => handleInputChange("recommendations", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partsCost">Parts Cost (₹)</Label>
                <Input
                  id="partsCost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={reportData.partsCost}
                  onChange={(e) => handleInputChange("partsCost", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborCost">Labor Cost (₹)</Label>
                <Input
                  id="laborCost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={reportData.laborCost}
                  onChange={(e) => handleInputChange("laborCost", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Total Cost (₹)</Label>
                <div className="flex items-center h-10 px-3 border border-border rounded-md bg-muted">
                  <span className="font-semibold">₹{calculateTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos, receipts, or documents
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerFeedback">Customer Feedback</Label>
                <Textarea
                  id="customerFeedback"
                  placeholder="Any feedback from the customer..."
                  value={reportData.customerFeedback}
                  onChange={(e) => handleInputChange("customerFeedback", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mechanicNotes">Mechanic Notes</Label>
                <Textarea
                  id="mechanicNotes"
                  placeholder="Internal notes for the workshop..."
                  value={reportData.mechanicNotes}
                  onChange={(e) => handleInputChange("mechanicNotes", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-mechanic hover:bg-mechanic/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ServiceReportPopup;
