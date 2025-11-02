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

export async function updateBooking(id, booking) {
  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
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
    toast && toast.error ? toast.error("Failed to update booking") : null;
    return { error: "Failed to update booking" };
  }
}

export async function deleteBooking(id) {
  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return { success: true };
  } catch (e) {
    toast && toast.error ? toast.error("Failed to delete booking") : null;
    return { error: "Failed to delete booking" };
  }
}

export async function getBookingById(id) {
  try {
    const res = await fetch(`/api/bookings/${id}`);
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to load booking") : null;
    return { error: "Failed to load booking" };
  }
}