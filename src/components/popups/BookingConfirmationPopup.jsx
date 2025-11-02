import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Calendar, MapPin, Car, CreditCard, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const BookingConfirmationPopup = ({ isOpen, onClose, bookingData, paymentData }) => {
  if (!isOpen || !bookingData) return null;

  const advanceAmount = bookingData?.totalAmount ? (bookingData.totalAmount * 0.3).toFixed(2) : "0.00";
  const remainingAmount = bookingData?.totalAmount ? (bookingData.totalAmount * 0.7).toFixed(2) : "0.00";

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
                <h2 className="text-2xl font-montserrat font-bold text-green-700 dark:text-green-400">Booking Confirmed!</h2>
                <p className="text-sm text-muted-foreground mt-1">Your booking has been successfully confirmed</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID</p>
                    <p className="font-semibold">#{bookingData?.bookingId || bookingData?.id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-green-500">Confirmed</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  {bookingData?.carMake && (
                    <div className="flex items-start gap-3">
                      <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="font-medium">{bookingData.carMake} {bookingData.carModel} ({bookingData.carYear})</p>
                      </div>
                    </div>
                  )}

                  {bookingData?.startDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Rental Period</p>
                        <p className="font-medium">
                          {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {bookingData?.pickupLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pickup Location</p>
                        <p className="font-medium">{bookingData.pickupLocation}</p>
                      </div>
                    </div>
                  )}

                  {bookingData?.dropoffLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dropoff Location</p>
                        <p className="font-medium">{bookingData.dropoffLocation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment & Transaction Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-semibold">{paymentData.transactionId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Date</p>
                      <p className="font-medium">{paymentData.timestamp ? new Date(paymentData.timestamp).toLocaleString() : new Date().toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-semibold">₹{bookingData?.totalAmount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Advance Paid (30%):</span>
                      <span className="font-semibold">₹{advanceAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Amount (70%):</span>
                      <span className="font-semibold">₹{remainingAmount}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Payment at Delivery</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                          Remaining amount of ₹{remainingAmount} will be collected at the time of vehicle delivery/pickup.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Please arrive 15 minutes before your scheduled pickup time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Bring a valid driver's license and ID proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>A security deposit may be required at pickup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Booking confirmation email will be sent shortly</span>
                  </li>
                </ul>
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

