package com.example.carcircle.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MaintenanceRepository extends MongoRepository<Maintenance, String> {
    List<Maintenance> findByCustomerId(String customerId);
    List<Maintenance> findByAssignedMechanic(String assignedMechanic);
    List<Maintenance> findByStatus(String status);
    List<Maintenance> findByPriority(String priority);
}
