package com.example.carcircle.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String senderId;
    private String receiverId;
    private String message;
    private String timestamp;
    private boolean read;

    // Additional fields for enhanced messaging
    private String from;
    private String fromRole;
    private String to;
    private String toRole;
    private String subject;
    private String content;

    public Message() {}

    public Message(String id, String senderId, String receiverId, String message) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
        this.timestamp = java.time.LocalDateTime.now().toString();
        this.read = false;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }

    public String getReceiverId() { return receiverId; }
    public void setReceiverId(String receiverId) { this.receiverId = receiverId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }

    // Additional getters and setters
    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getFromRole() { return fromRole; }
    public void setFromRole(String fromRole) { this.fromRole = fromRole; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public String getToRole() { return toRole; }
    public void setToRole(String toRole) { this.toRole = toRole; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
