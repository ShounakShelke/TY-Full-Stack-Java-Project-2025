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
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (err) {
    toast && toast.error ? toast.error("Login failed") : null;
    return { error: "Login failed" };
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
      toast && toast.error ? toast.error(msg) : null;
      return { error: msg };
    }
    return await res.json();
  } catch (err) {
    toast && toast.error ? toast.error("Registration failed") : null;
    return { error: "Registration failed" };
  }
}
