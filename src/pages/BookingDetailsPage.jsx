import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Car, CreditCard, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/ui/navbar";
import { getBookingById, updateBooking, deleteBooking } from "../api/bookings";
import { getCarById } from "../api/cars";
import { PaymentPopup } from "../components/popups/PaymentPopup";
import { BookingConfirmationPopup } from "../components/popups/BookingConfirmationPopup";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchBookingDetails();
  }, [id]);

  async function fetchBookingDetails() {
    setLoading(true);
    try {
      const bookingResult = await getBookingById(id);
      if (bookingResult.error) {
        setError(bookingResult.error);
        return;
      }
      setBooking(bookingResult);
      
      // Fetch car details if carId exists
      if (bookingResult.carId) {
        const carResult = await getCarById(bookingResult.carId);
        if (!carResult.error) {
          setCar(carResult);
        }
      }
    } catch (e) {
      setError("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  }

  const handlePaymentSuccess = async (paymentInfo) => {
    setPaymentData(paymentInfo);
    setShowPaymentPopup(false);
    
    // Update booking with payment info
    try {
      const result = await updateBooking(id, {
        ...booking,
        paymentStatus: "paid",
        paymentData: paymentInfo
      });
      
      if (!result.error) {
        setShowConfirmationPopup(true);
        await fetchBookingDetails(); // Refresh booking data
        toast({ title: "Payment Successful!", description: "Your payment has been processed successfully." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update booking.", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const result = await deleteBooking(id);
      if (!result.error) {
        toast({ title: "Booking Cancelled", description: "Your booking has been cancelled successfully." });
        navigate("/customer");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to cancel booking.", variant: "destructive" });
    }
  };

  const calculateRemainingAmount = () => {
    if (!booking) return 0;
    const total = booking.totalAmount || 0;
    const advance = booking.advanceAmount || 0;
    return total - advance;
  };

  if (loading) return <div className="p-8 text-center">Loading booking details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!booking) return <div className="p-8 text-center text-gray-500">Booking not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate("/customer")} className="mb-6 hover:bg-muted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">Booking #{booking.id}</CardTitle>
                      <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {car && (
                      <div className="flex items-start gap-4">
                        <img 
                          src={car.image || "/placeholder.svg"} 
                          alt={car.make + " " + car.model}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
                          <p className="text-muted-foreground">{car.year}</p>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Start Date</p>
                          <p className="font-medium">
                            {new Date(booking.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="font-medium">
                            {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {booking.pickupLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Pickup</p>
                            <p className="font-medium">{booking.pickupLocation}</p>
                          </div>
                        </div>
                      )}
                      {booking.dropoffLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Dropoff</p>
                            <p className="font-medium">{booking.dropoffLocation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Payment & Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-semibold">₹{booking.totalAmount || 0}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Advance Paid:</span>
                      <span className="font-semibold">₹{booking.advanceAmount || 0}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Remaining:</span>
                      <span>₹{calculateRemainingAmount()}</span>
                    </div>
                    {calculateRemainingAmount() > 0 && (
                      <Button 
                        className="w-full" 
                        onClick={() => setShowPaymentPopup(true)}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Remaining Amount
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/cars/${booking.carId}`)}
                    >
                      <Car className="h-4 w-4 mr-2" />
                      View Car Details
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        bookingData={{
          ...booking,
          carMake: car?.make,
          carModel: car?.model,
          carYear: car?.year,
          totalAmount: calculateRemainingAmount()
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Confirmation Popup */}
      <BookingConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={() => {
          setShowConfirmationPopup(false);
          fetchBookingDetails();
        }}
        bookingData={{
          ...booking,
          bookingId: booking.id,
          carMake: car?.make,
          carModel: car?.model,
          carYear: car?.year,
          totalAmount: booking.totalAmount
        }}
        paymentData={paymentData}
      />
    </div>
  );
};

export default BookingDetailsPage;

