package com.example.carcircle.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carcircle.auth.User;

@RestController
@RequestMapping("/api/user")
public class ProfileController {
    // This is ONLY for demo. In real app you use session/JWT/current principal, per logged in user.
    private static User currentUser = null;

    @GetMapping("/profile")
    public User getProfile() {
        return currentUser;
    }
    @PostMapping("/profile")
    public User updateProfile(@RequestBody User newUser) {
        // Overwrite fields for demo
        currentUser = newUser;
        return currentUser;
    }
    // For demo: setProfile (simulate login flow)
    @PostMapping("/setProfile")
    public void setProfile(@RequestBody User user) {
        currentUser = user;
    }
}
