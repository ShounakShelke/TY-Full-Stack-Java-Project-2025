import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const PaymentPopup = ({ isOpen, onClose, bookingData, onPaymentSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    cardType: "credit"
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!paymentData.cardName) {
      newErrors.cardName = "Please enter cardholder name";
    }
    if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
      newErrors.expiryDate = "Please enter expiry date (MM/YY)";
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = "Please enter CVV";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onPaymentSuccess) {
        onPaymentSuccess({
          ...paymentData,
          transactionId: `TXN${Date.now()}`,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setErrors({ submit: "Payment processing failed. Please try again." });
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

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
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-montserrat font-bold">Payment</h2>
              <p className="text-sm text-muted-foreground mt-1">Pay advance amount to confirm booking</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {bookingData?.carMake && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-medium">{bookingData.carMake} {bookingData.carModel}</span>
                  </div>
                )}
                {bookingData?.startDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental Period:</span>
                    <span className="font-medium">
                      {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-lg">₹{bookingData?.totalAmount || "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Advance (30%):</span>
                  <span className="font-semibold text-primary">₹{advanceAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining (70%):</span>
                  <span className="text-muted-foreground">₹{remainingAmount} (at delivery)</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                    className="pl-10"
                    maxLength={19}
                    required
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-sm text-red-600">{errors.cardNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={paymentData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  required
                />
                {errors.cardName && (
                  <p className="text-sm text-red-600">{errors.cardName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (MM/YY) *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="12/25"
                    value={paymentData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", formatExpiry(e.target.value))}
                    maxLength={5}
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-red-600">{errors.expiryDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    type="password"
                    maxLength={4}
                    required
                  />
                  {errors.cvv && (
                    <p className="text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Your payment information is secure and encrypted
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={processing}
                >
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Pay ₹{advanceAmount}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

