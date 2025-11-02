package com.example.carcircle.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findBySenderId(String senderId);
    List<Message> findByReceiverId(String receiverId);
    List<Message> findBySenderIdOrReceiverId(String senderId, String receiverId);
    List<Message> findByRead(boolean read);
}
