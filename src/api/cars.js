import { toast } from "../hooks/use-toast";

export async function getAllCars() {
  try {
    const res = await fetch("/api/cars");
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to get cars") : null;
    return { error: "Failed to get cars" };
  }
}

export async function getCarById(id) {
  try {
    const res = await fetch(`/api/cars/${id}`);
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to get car") : null;
    return { error: "Failed to get car" };
  }
}

// VEHICLE CRUD for inventory management (admin/manager)
export async function getVehicles() {
  try {
    const res = await fetch("/api/vehicles");
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to get vehicles") : null;
    return { error: "Failed to get vehicles" };
  }
}

export async function addVehicle(car) {
  try {
    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to add vehicle") : null;
    return { error: "Failed to add vehicle" };
  }
}

export async function updateVehicle(car) {
  try {
    const res = await fetch(`/api/vehicles/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to update vehicle") : null;
    return { error: "Failed to update vehicle" };
  }
}

export async function deleteVehicle(id) {
  try {
    const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return { success: true };
  } catch (e) {
    toast && toast.error ? toast.error("Failed to delete vehicle") : null;
    return { error: "Failed to delete vehicle" };
  }
}
