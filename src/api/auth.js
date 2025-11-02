import { toast } from "../hooks/use-toast";

// Central API for auth requests
export async function login({ email, password }) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const msg = await res.text();
      const errorMsg = msg || "Login failed. Please check your credentials.";
      toast && toast.error ? toast.error(errorMsg) : console.error(errorMsg);
      return { error: errorMsg };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    const errorMsg = err?.message || "Network error. Please check your connection.";
    toast && toast.error ? toast.error(errorMsg) : console.error(errorMsg);
    return { error: errorMsg };
  }
}

export async function register({ email, username, password, role }) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, role }),
    });
    if (!res.ok) {
      const msg = await res.text();
      const errorMsg = msg || "Registration failed. Please try again.";
      toast && toast.error ? toast.error(errorMsg) : console.error(errorMsg);
      return { error: errorMsg };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    const errorMsg = err?.message || "Network error. Please check your connection.";
    toast && toast.error ? toast.error(errorMsg) : console.error(errorMsg);
    return { error: errorMsg };
  }
}
