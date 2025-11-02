import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Car, User, FileText, Calendar, MapPin, Phone, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const SellReceiptPopup = ({ isOpen, onClose, listingData, ownerData, token }) => {
  if (!isOpen || !listingData) return null;

  return (
    <AnimatePresence>
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
          <div className="flex items-center justify-between p-6 border-b bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-montserrat font-bold text-green-700 dark:text-green-400">Car Listed Successfully!</h2>
                <p className="text-sm text-muted-foreground mt-1">Your car listing has been submitted for review</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Token/Receipt Number */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Listing Token/Receipt Number</p>
                  <h3 className="text-3xl font-montserrat font-bold text-primary mb-2">{token}</h3>
                  <p className="text-xs text-muted-foreground">
                    Keep this token for future reference and tracking
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Owner Details */}
            {ownerData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Owner Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{ownerData.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{ownerData.phone || "N/A"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{ownerData.email || "N/A"}</p>
                      </div>
                    </div>
                    {ownerData.address && (
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <div className="flex items-start gap-2">
                          <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="font-medium">{ownerData.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="font-medium">{listingData.brand || listingData.make || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Model</p>
                    <p className="font-medium">{listingData.model || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{listingData.year || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">KM Driven</p>
                    <p className="font-medium">{listingData.kmDriven || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-medium capitalize">{listingData.fuelType || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-medium capitalize">{listingData.transmission || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Owner Type</p>
                    <p className="font-medium capitalize">{listingData.ownerType || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Price</p>
                    <p className="font-semibold text-lg text-primary">₹{listingData.price || "0"}</p>
                  </div>
                </div>
                {listingData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Location: </p>
                    <p className="font-medium">{listingData.location}</p>
                  </div>
                )}
                {listingData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{listingData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Listing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Listing Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Listing Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Listing Time:</span>
                    <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant="secondary">Pending Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">Important Information</p>
                    <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
                      <li>• Your listing is now pending review by our team</li>
                      <li>• We will contact you at {ownerData?.phone || ownerData?.email || "your provided contact"} within 24-48 hours</li>
                      <li>• Keep your token number ({token}) for reference</li>
                      <li>• Your car will appear in the "For Sale" section after approval</li>
                      <li>• Please ensure all documents are ready for verification</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button onClick={() => window.print()} className="flex-1 bg-primary hover:bg-primary/90">
                Print Receipt
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

