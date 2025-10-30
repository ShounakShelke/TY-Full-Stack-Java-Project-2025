package com.example.carcircle.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/{role}")
    public Map<String, Object> getDashboard(@PathVariable String role) {
        switch(role.toLowerCase()) {
            case "admin":
                return Map.of(
                    "stats", List.of(
                        Map.of("label", "Total Users", "value", 2847, "trend", "+12% this month"),
                        Map.of("label", "Active Rentals", "value", 156, "trend", "85% capacity"),
                        Map.of("label", "System Health", "value", "99.9%", "trend", "All systems operational"),
                        Map.of("label", "Open Tickets", "value", 23, "trend", "3 high priority")
                    ),
                    "alerts", List.of(
                        Map.of("type", "warning", "title", "High API Usage", "description", "Payment gateway approaching rate limit", "time", "5 min ago"),
                        Map.of("type", "info", "title", "System Backup Completed", "description", "Daily backup completed successfully", "time", "2 hours ago")
                    )
                );
            case "manager":
                return Map.of(
                    "stats", List.of(
                        Map.of("label", "Total Fleet", "value", 24, "trend", "+2 this month"),
                        Map.of("label", "Active Rentals", "value", 18, "trend", "75% utilization"),
                        Map.of("label", "Monthly Revenue", "value", "₹1,85,000", "trend", "+12% vs last month"),
                        Map.of("label", "Average Rating", "value", "4.8", "trend", "96% satisfaction")
                    ),
                    "recentBookings", List.of(
                        Map.of("id", 1, "customer", "Shounak Shelke", "car", "Honda City", "duration", "3 days", "amount", "₹4,500", "status", "Confirmed"),
                        Map.of("id", 2, "customer", "Sahil Kanchan", "car", "BMW X1", "duration", "1 week", "amount", "₹12,600", "status", "In Progress"),
                        Map.of("id", 3, "customer", "Shivam Bhosle", "car", "Maruti Swift", "duration", "2 days", "amount", "₹2,400", "status", "Completed")
                    )
                );
            case "mechanic":
                return Map.of(
                    "stats", List.of(
                        Map.of("label", "Assigned Vehicles", "value", 12),
                        Map.of("label", "Pending Jobs", "value", 5),
                        Map.of("label", "Completed Today", "value", 3),
                        Map.of("label", "Urgent Alerts", "value", 2)
                    ),
                    "urgentJobs", List.of(
                        Map.of("id", 1, "vehicle", "BMW X3 - MH01AB1234", "issue", "Brake pad replacement", "priority", "High", "assignedDate", "2024-01-15", "deadline", "2024-01-16"),
                        Map.of("id", 2, "vehicle", "Honda City - MH02CD5678", "issue", "Oil change & filter replacement", "priority", "Medium", "assignedDate", "2024-01-14", "deadline", "2024-01-17")
                    )
                );
            case "customer":
                return Map.of(
                    "stats", List.of(
                        Map.of("label", "Active Rentals", "value", 2),
                        Map.of("label", "Completed Trips", "value", 15),
                        Map.of("label", "Loyalty Points", "value", 1250)
                    ),
                    "activeRentals", List.of(
                        Map.of("id", 1, "car", "BMW X3", "pickup", "2024-01-15", "return", "2024-01-18", "status", "Active", "location", "Mumbai Central"),
                        Map.of("id", 2, "car", "Honda City", "pickup", "2024-01-20", "return", "2024-01-22", "status", "Upcoming", "location", "Pune Airport")
                    )
                );
            default:
                return Map.of("message", "No dashboard data for this role" );
        }
    }
}
