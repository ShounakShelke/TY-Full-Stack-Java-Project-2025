import { toast } from "../hooks/use-toast";

// Shared messages API
export async function getMessages(role) {
  try {
    const res = await fetch(`/api/messages?role=${role || "all"}`);
    if (!res.ok) {
      console.error("Failed to get messages");
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to get messages:", e);
    return [];
  }
}

export async function getMessagesByReceiver(receiverId) {
  try {
    const res = await fetch(`/api/messages/receiver/${receiverId}`);
    if (!res.ok) {
      console.error("Failed to get messages by receiver");
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to get messages by receiver:", e);
    return [];
  }
}

export async function getMessagesBySender(senderId) {
  try {
    const res = await fetch(`/api/messages/sender/${senderId}`);
    if (!res.ok) {
      console.error("Failed to get messages by sender");
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to get messages by sender:", e);
    return [];
  }
}

export async function getConversation(user1, user2) {
  try {
    const res = await fetch(`/api/messages/conversation?user1=${user1}&user2=${user2}`);
    if (!res.ok) {
      console.error("Failed to get conversation");
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("Failed to get conversation:", e);
    return [];
  }
}

export async function sendMessage(message) {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });
    if (!res.ok) {
      const msg = await res.text();
      console.error("Failed to send message:", msg);
      return { error: msg };
    }
    return await res.json();
  } catch (e) {
    console.error("Failed to send message:", e);
    return { error: "Failed to send message" };
  }
}

export async function markMessageAsRead(messageId) {
  try {
    const res = await fetch(`/api/messages/${messageId}/read`, {
      method: "PUT"
    });
    if (!res.ok) {
      return { error: "Failed to mark message as read" };
    }
    return await res.json();
  } catch (e) {
    console.error("Failed to mark message as read:", e);
    return { error: "Failed to mark message as read" };
  }
}

