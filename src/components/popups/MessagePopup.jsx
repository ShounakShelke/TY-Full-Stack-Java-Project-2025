import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MessagePopup = ({ isOpen, onClose, role }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    content: ""
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen]);

  const loadMessages = async () => {
    // Load messages from localStorage or API
    const savedMessages = localStorage.getItem(`messages_${role}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const saveMessages = (msgs) => {
    localStorage.setItem(`messages_${role}`, JSON.stringify(msgs));
    setMessages(msgs);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.subject || !newMessage.content) {
      alert("Please fill in subject and message content");
      return;
    }

    setSending(true);
    const message = {
      id: Date.now(),
      from: role === "admin" ? "Admin" : "Manager",
      to: newMessage.to || "All",
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date().toISOString(),
      read: false
    };

    setTimeout(() => {
      const updatedMessages = [message, ...messages];
      saveMessages(updatedMessages);
      setNewMessage({ to: "", subject: "", content: "" });
      setSending(false);
      alert("Message sent successfully!");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-montserrat font-bold">Messages</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Send Message Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <Input
                        id="to"
                        placeholder="Enter recipient (e.g., Manager, Admin, All)"
                        value={newMessage.to}
                        onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Enter message subject"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Message *</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter your message..."
                        value={newMessage.content}
                        onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={sending}>
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Messages List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Messages ({messages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No messages yet. Send a message to get started.
                      </p>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg border ${!msg.read ? "bg-primary/5 border-primary" : "bg-muted/50"}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold text-sm">{msg.from}</span>
                              <span className="text-xs text-muted-foreground">→ {msg.to}</span>
                            </div>
                            {!msg.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                          </div>
                          <h4 className="font-medium text-sm mb-1">{msg.subject}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{msg.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

