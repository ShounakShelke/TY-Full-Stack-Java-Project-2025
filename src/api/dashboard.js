import { toast } from "../hooks/use-toast";

export async function getDashboard(role) {
  try {
    const res = await fetch(`/api/dashboard/${role}`);
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to fetch dashboard") : null;
    return { error: "Failed to fetch dashboard" };
  }
}
