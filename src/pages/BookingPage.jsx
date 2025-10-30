import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Car, CreditCard, User, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";
import { getBookings, createBooking } from "../api/bookings";
import { useAuth } from "../context/AuthContext";

const BookingPage = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    carId: "1",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const result = await getBookings();
      setBookings(result);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to book.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createBooking({ ...bookingData, userId: user.id });
      setSuccess(true);
      fetchBookings();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setCurrentStep(4);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading bookings...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Bookings List */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {(!bookings || bookings.length === 0) ? (
              <div>No bookings found.</div>
            ) : (
              <ul>
              {bookings.map((b) => (
                <li key={b.id} className="mb-2 p-2 border-b">
                  Booking #{b.id}: Car {b.carId} from {b.startDate} to {b.endDate}
                </li>
              ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 pb-10">
        <Card>
          <CardHeader>
            <CardTitle>Book a Car</CardTitle>
          </CardHeader>
          <CardContent>
            {!success ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4 max-w-sm">
                <div>
                  <label className="block mb-1 font-medium">Car ID</label>
                  <Input value={bookingData.carId} onChange={e => setBookingData({ ...bookingData, carId: e.target.value })} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Start Date</label>
                  <Input type="date" value={bookingData.startDate} onChange={e => setBookingData({ ...bookingData, startDate: e.target.value })} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <Input type="date" value={bookingData.endDate} onChange={e => setBookingData({ ...bookingData, endDate: e.target.value })} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Pickup Location</label>
                  <Input value={bookingData.pickupLocation} onChange={e => setBookingData({ ...bookingData, pickupLocation: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Dropoff Location</label>
                  <Input value={bookingData.dropoffLocation} onChange={e => setBookingData({ ...bookingData, dropoffLocation: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Book Now</Button>
              </form>
            ) : (
              <div className="text-green-600 font-bold">Booking successful!</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
