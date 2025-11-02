import { toast } from "../hooks/use-toast";

export async function listUsers() {
  try {
    const res = await fetch('/api/auth/users');
    if (!res.ok) {
      const msg = await res.text();
      console.error("Failed to fetch users:", msg);
      return []; // Return empty array instead of error
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to fetch users:", e);
    return []; // Return empty array on error
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`/api/auth/users/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to fetch user") : null;
    return { error: "Failed to fetch user" };
  }
}

export async function updateUser(user) {
  try {
    const res = await fetch(`/api/auth/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to update user") : null;
    return { error: "Failed to update user" };
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    return { success: true };
  } catch (e) {
    toast && toast.error ? toast.error("Failed to delete user") : null;
    return { error: "Failed to delete user" };
  }
}

export async function createUser(user) {
  try {
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    toast && toast.error ? toast.error("Failed to create user") : null;
    return { error: "Failed to create user" };
  }
}
