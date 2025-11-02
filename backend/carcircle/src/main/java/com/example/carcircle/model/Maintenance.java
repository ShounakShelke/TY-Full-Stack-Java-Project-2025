package com.example.carcircle.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "maintenance")
public class Maintenance {
    @Id
    private String id;
    private String vehicleId;
    private String customerId;
    private String issue;
    private String priority; // "Low", "Medium", "High", "Urgent"
    private String status; // "Pending", "In Progress", "Completed", "Cancelled"
    private String assignedMechanic;
    private String createdAt;
    private String deadline;
    private String completedAt;

    public Maintenance() {}

    public Maintenance(String id, String vehicleId, String customerId, String issue, String priority, String status, String assignedMechanic, String deadline) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.customerId = customerId;
        this.issue = issue;
        this.priority = priority;
        this.status = status;
        this.assignedMechanic = assignedMechanic;
        this.deadline = deadline;
        this.createdAt = java.time.LocalDateTime.now().toString();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getVehicleId() { return vehicleId; }
    public void setVehicleId(String vehicleId) { this.vehicleId = vehicleId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getIssue() { return issue; }
    public void setIssue(String issue) { this.issue = issue; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignedMechanic() { return assignedMechanic; }
    public void setAssignedMechanic(String assignedMechanic) { this.assignedMechanic = assignedMechanic; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getCompletedAt() { return completedAt; }
    public void setCompletedAt(String completedAt) { this.completedAt = completedAt; }
}
