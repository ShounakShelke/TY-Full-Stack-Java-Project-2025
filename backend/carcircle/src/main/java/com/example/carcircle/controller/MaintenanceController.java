package com.example.carcircle.controller;

import com.example.carcircle.model.Maintenance;
import com.example.carcircle.model.MaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {
    @Autowired
    private MaintenanceRepository maintenanceRepo;

    @GetMapping
    public List<Maintenance> getAllMaintenanceJobs() {
        return maintenanceRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Maintenance> getMaintenanceJobById(@PathVariable String id) {
        Optional<Maintenance> job = maintenanceRepo.findById(id);
        if (job.isPresent()) {
            return ResponseEntity.ok(job.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Maintenance addMaintenanceJob(@RequestBody Maintenance job) {
        // Set default status if not provided
        if (job.getStatus() == null || job.getStatus().isEmpty()) {
            job.setStatus("Pending");
        }
        // Set created timestamp
        job.setCreatedAt(java.time.LocalDateTime.now().toString());
        return maintenanceRepo.save(job);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Maintenance> updateMaintenanceJob(@PathVariable String id, @RequestBody Maintenance jobDetails) {
        Optional<Maintenance> optionalJob = maintenanceRepo.findById(id);
        if (optionalJob.isPresent()) {
            Maintenance job = optionalJob.get();
            job.setVehicleId(jobDetails.getVehicleId());
            job.setCustomerId(jobDetails.getCustomerId());
            job.setIssue(jobDetails.getIssue());
            job.setPriority(jobDetails.getPriority());
            job.setStatus(jobDetails.getStatus());
            job.setAssignedMechanic(jobDetails.getAssignedMechanic());
            job.setDeadline(jobDetails.getDeadline());
            if (jobDetails.getStatus() != null && jobDetails.getStatus().equals("Completed")) {
                job.setCompletedAt(java.time.LocalDateTime.now().toString());
            }
            Maintenance updatedJob = maintenanceRepo.save(job);
            return ResponseEntity.ok(updatedJob);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenanceJob(@PathVariable String id) {
        Optional<Maintenance> job = maintenanceRepo.findById(id);
        if (job.isPresent()) {
            maintenanceRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Additional endpoints for filtering
    @GetMapping("/customer/{customerId}")
    public List<Maintenance> getMaintenanceJobsByCustomer(@PathVariable String customerId) {
        return maintenanceRepo.findByCustomerId(customerId);
    }

    @GetMapping("/mechanic/{mechanicId}")
    public List<Maintenance> getMaintenanceJobsByMechanic(@PathVariable String mechanicId) {
        return maintenanceRepo.findByAssignedMechanic(mechanicId);
    }

    @GetMapping("/status/{status}")
    public List<Maintenance> getMaintenanceJobsByStatus(@PathVariable String status) {
        return maintenanceRepo.findByStatus(status);
    }
}
