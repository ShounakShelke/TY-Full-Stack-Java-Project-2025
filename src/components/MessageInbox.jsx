import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MessageSquare, User, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMessages, sendMessage, markMessageAsRead, getMessagesByReceiver, getMessagesBySender } from "../api/messages";

export const MessageInbox = ({ onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const role = user?.role || 'customer';
      let msgs = [];

      // Get messages where user is receiver
      const receivedMsgs = await getMessagesByReceiver(user?.id);
      msgs = msgs.concat(receivedMsgs);

      // Get messages where user is sender
      const sentMsgs = await getMessagesBySender(user?.id);
      msgs = msgs.concat(sentMsgs);

      // Remove duplicates based on id
      const uniqueMsgs = msgs.filter((msg, index, self) =>
        index === self.findIndex(m => m.id === msg.id)
      );

      // Sort by timestamp (newest first)
      uniqueMsgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(uniqueMsgs);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !recipient.trim()) return;

    setSending(true);
    try {
      const messageData = {
        senderId: user?.id,
        senderName: user?.name || user?.email,
        senderRole: user?.role || 'customer',
        receiverId: recipient,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false
      };

      const result = await sendMessage(messageData);
      if (!result.error) {
        setNewMessage('');
        setRecipient('');
        await fetchMessages();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await markMessageAsRead(messageId);
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'inbox') {
      return msg.receiverId === user?.id || msg.senderId === user?.id;
    }
    return msg.senderId === user?.id;
  });

  const unreadCount = messages.filter(msg =>
    msg.receiverId === user?.id && !msg.read
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
      >
        <Card className="border-0 shadow-none h-full">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 h-full">
            <div className="flex h-[600px]">
              {/* Sidebar */}
              <div className="w-64 border-r bg-muted/30">
                <div className="p-4 border-b">
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'inbox' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('inbox')}
                      className="flex-1"
                    >
                      Inbox
                    </Button>
                    <Button
                      variant={activeTab === 'sent' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('sent')}
                      className="flex-1"
                    >
                      Sent
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Send to:</label>
                    <Input
                      placeholder="Recipient ID or Email"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={sending || !newMessage.trim() || !recipient.trim()}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  {loading ? (
                    <div className="text-center py-8">Loading messages...</div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No messages found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg border ${
                            !message.read && message.receiverId === user?.id
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-card'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium">
                                  {message.senderId === user?.id ? 'You' : message.senderName || 'Unknown'}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {message.senderRole || 'user'}
                                </Badge>
                                {!message.read && message.receiverId === user?.id && (
                                  <Badge variant="destructive" className="text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground mb-2">
                                {message.message}
                              </p>

                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(message.timestamp).toLocaleString()}
                              </div>
                            </div>

                            {!message.read && message.receiverId === user?.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(message.id)}
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
