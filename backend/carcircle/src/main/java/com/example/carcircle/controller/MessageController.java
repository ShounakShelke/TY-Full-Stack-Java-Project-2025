package com.example.carcircle.controller;

import com.example.carcircle.model.Message;
import com.example.carcircle.model.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepo;

    @GetMapping
    public List<Message> getAllMessages(@RequestParam(required = false) String role) {
        if (role != null && !role.isEmpty()) {
            // For now, return all messages. In a real app, you'd filter by role/user
            return messageRepo.findAll();
        }
        return messageRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable String id) {
        Optional<Message> message = messageRepo.findById(id);
        if (message.isPresent()) {
            return ResponseEntity.ok(message.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        // Set timestamp if not provided
        if (message.getTimestamp() == null || message.getTimestamp().isEmpty()) {
            message.setTimestamp(java.time.LocalDateTime.now().toString());
        }

        // Handle different message formats
        if (message.getFrom() != null && message.getTo() != null) {
            // New format with from/to fields - convert to senderId/receiverId
            if (message.getSenderId() == null) {
                message.setSenderId(message.getFrom());
            }
            if (message.getReceiverId() == null) {
                // For "all" recipients, we need to handle differently
                if ("all".equals(message.getTo())) {
                    // This is a broadcast message - we'll handle it differently
                    message.setReceiverId("all");
                } else {
                    message.setReceiverId(message.getTo());
                }
            }
            // Copy content to message field if not set
            if (message.getMessage() == null && message.getContent() != null) {
                message.setMessage(message.getContent());
            }
        }

        return messageRepo.save(message);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markMessageAsRead(@PathVariable String id) {
        Optional<Message> optionalMessage = messageRepo.findById(id);
        if (optionalMessage.isPresent()) {
            Message message = optionalMessage.get();
            message.setRead(true);
            Message updatedMessage = messageRepo.save(message);
            return ResponseEntity.ok(updatedMessage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String id) {
        Optional<Message> message = messageRepo.findById(id);
        if (message.isPresent()) {
            messageRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Additional endpoints for filtering
    @GetMapping("/sender/{senderId}")
    public List<Message> getMessagesBySender(@PathVariable String senderId) {
        return messageRepo.findBySenderId(senderId);
    }

    @GetMapping("/receiver/{receiverId}")
    public List<Message> getMessagesByReceiver(@PathVariable String receiverId) {
        return messageRepo.findByReceiverId(receiverId);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam String user1, @RequestParam String user2) {
        return messageRepo.findBySenderIdOrReceiverId(user1, user2);
    }
}
