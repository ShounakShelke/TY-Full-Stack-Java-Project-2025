import { toast } from "../hooks/use-toast";

export async function getBookings() {
  try {
    const res = await fetch('/api/bookings');
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to load bookings") : null;
    return { error: "Failed to load bookings" };
  }
}

export async function createBooking(booking) {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to create booking") : null;
    return { error: "Failed to create booking" };
  }
}
