import { toast } from "../hooks/use-toast";

export async function getDashboard(role) {
  try {
    const res = await fetch(`/api/dashboard/${role}`);
    if (!res.ok) {
      const msg = await res.text();
      console.error(`Dashboard API error for ${role}:`, msg);
      // Don't show toast on error, return empty data instead
      return { stats: [], alerts: [], urgentJobs: [], recentBookings: [] };
    }
    const data = await res.json();
    return data || { stats: [], alerts: [], urgentJobs: [], recentBookings: [] };
  } catch (e) {
    console.error("Failed to fetch dashboard:", e);
    // Return empty data structure instead of error
    return { stats: [], alerts: [], urgentJobs: [], recentBookings: [] };
  }
}
