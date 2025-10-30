import { toast } from "../hooks/use-toast";

export async function getProfile() {
  try {
    const res = await fetch('/api/user/profile');
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to fetch profile") : null;
    return { error: "Failed to fetch profile" };
  }
}

export async function updateProfile(profile) {
  try {
    const res = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) {
      const msg = await res.text();
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to update profile") : null;
    return { error: "Failed to update profile" };
  }
}
