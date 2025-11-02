import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Download, Printer, Car, Calendar, MapPin, CreditCard } from "lucide-react";

export const ReceiptPopup = ({ booking, car, onClose }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handleDownload = () => {
    // Simple download as text file
    const receiptText = generateReceiptText();
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking?.id || 'booking'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReceiptText = () => {
    return `
CARS CIRCLE RECEIPT
===================

Booking ID: ${booking?.id || 'N/A'}
Date: ${new Date().toLocaleDateString()}

Customer Details:
- Name: ${booking?.customerName || 'N/A'}
- Email: ${booking?.customerEmail || 'N/A'}

Vehicle Details:
- Make/Model: ${car ? `${car.make} ${car.model}` : 'N/A'}
- Year: ${car?.year || 'N/A'}
- License Plate: ${car?.licensePlate || 'N/A'}

Booking Details:
- Start Date: ${booking?.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}
- End Date: ${booking?.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}
- Pickup Location: ${booking?.pickupLocation || 'N/A'}
- Status: ${booking?.status || 'N/A'}

Payment Summary:
- Subtotal: ₹${booking?.subtotal || 0}
- Tax (18%): ₹${booking?.tax || 0}
- Total Amount: ₹${booking?.totalAmount || 0}

Thank you for choosing Cars Circle!
    `;
  };

  const calculateDays = () => {
    if (!booking?.startDate || !booking?.endDate) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const dailyRate = car?.dailyRate || 0;
  const subtotal = days * dailyRate;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-montserrat">Booking Receipt</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
                <Printer className="h-4 w-4 mr-1" />
                {isPrinting ? 'Printing...' : 'Print'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h1 className="text-3xl font-bold text-primary">CARS CIRCLE</h1>
              <p className="text-muted-foreground">Your Trusted Car Rental Partner</p>
              <Badge variant="secondary" className="mt-2">
                Receipt #{booking?.id || 'N/A'}
              </Badge>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Vehicle Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Make/Model:</span> {car ? `${car.make} ${car.model}` : 'N/A'}</p>
                  <p><span className="font-medium">Year:</span> {car?.year || 'N/A'}</p>
                  <p><span className="font-medium">License Plate:</span> {car?.licensePlate || 'N/A'}</p>
                  <p><span className="font-medium">Daily Rate:</span> ₹{car?.dailyRate || 0}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Booking Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Start Date:</span> {booking?.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A'}</p>
                  <p><span className="font-medium">End Date:</span> {booking?.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}</p>
                  <p><span className="font-medium">Duration:</span> {days} days</p>
                  <p><span className="font-medium">Status:</span> <Badge variant={booking?.status === 'Confirmed' ? 'default' : 'secondary'}>{booking?.status || 'N/A'}</Badge></p>
                </div>
              </div>
            </div>

            {/* Customer & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {booking?.customerName || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {booking?.customerEmail || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {booking?.customerPhone || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pickup Location
                </h3>
                <p className="text-sm">{booking?.pickupLocation || 'N/A'}</p>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Summary
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Rate × {days} days</span>
                  <span>₹{dailyRate} × {days} = ₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              <p>Thank you for choosing Cars Circle!</p>
              <p className="mt-1">For any queries, contact us at support@carscircle.com</p>
              <p className="mt-2 text-xs">
                This is a computer-generated receipt and does not require a signature.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
