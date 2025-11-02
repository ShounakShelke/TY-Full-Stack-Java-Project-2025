import { toast } from "../hooks/use-toast";

export async function getMaintenanceJobs() {
  try {
    const res = await fetch("/api/maintenance");
    if (!res.ok) {
      const msg = await res.text();
      console.error("Failed to get maintenance jobs:", msg);
      return []; // Return empty array instead of error
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to get maintenance jobs:", e);
    return []; // Return empty array on error
  }
}

export async function addMaintenanceJob(job) {
  try {
    const res = await fetch("/api/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to add maintenance job") : null;
    return { error: "Failed to add maintenance job" };
  }
}

export async function updateMaintenanceJob(job) {
  try {
    const res = await fetch(`/api/maintenance/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to update maintenance job") : null;
    return { error: "Failed to update maintenance job" };
  }
}

export async function deleteMaintenanceJob(id) {
  try {
    const res = await fetch(`/api/maintenance/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return { success: true };
  } catch (e) {
    toast && toast.error ? toast.error("Failed to delete maintenance job") : null;
    return { error: "Failed to delete maintenance job" };
  }
}
