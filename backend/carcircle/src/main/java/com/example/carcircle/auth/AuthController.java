package com.example.carcircle.auth;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String username = req.getOrDefault("username", email);
        String password = req.get("password");
        String role = req.getOrDefault("role", "customer");
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }
        if (userRepo.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User newUser = new User(null, username, email, password, role);
        userRepo.save(newUser);
        return ResponseEntity.ok(Map.of(
                "id", newUser.getId(),
                "email", newUser.getEmail(),
                "username", newUser.getUsername(),
                "role", newUser.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            String token = java.util.Base64.getEncoder().encodeToString((email + ":mocktoken").getBytes());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "username", user.getUsername(),
                    "id", user.getId()
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    // ADMIN USER MANAGEMENT ENDPOINTS
    @GetMapping("/users")
    public Iterable<User> listAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        return userRepo.findById(id)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User update) {
        update.setId(id);
        userRepo.save(update);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User saved = userRepo.save(user);
        return ResponseEntity.ok(saved);
    }
}
