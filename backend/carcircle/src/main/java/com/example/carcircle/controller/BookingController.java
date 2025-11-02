package com.example.carcircle.controller;

import com.example.carcircle.model.Booking;
import com.example.carcircle.model.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepo;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        Optional<Booking> booking = bookingRepo.findById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Booking addBooking(@RequestBody Booking booking) {
        // Set default status if not provided
        if (booking.getStatus() == null || booking.getStatus().isEmpty()) {
            booking.setStatus("Pending");
        }
        // Set timestamps
        booking.setCreatedAt(java.time.LocalDateTime.now().toString());
        booking.setUpdatedAt(java.time.LocalDateTime.now().toString());
        return bookingRepo.save(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable String id, @RequestBody Booking bookingDetails) {
        Optional<Booking> optionalBooking = bookingRepo.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setCarId(bookingDetails.getCarId());
            booking.setUserId(bookingDetails.getUserId());
            booking.setStartDate(bookingDetails.getStartDate());
            booking.setEndDate(bookingDetails.getEndDate());
            booking.setStatus(bookingDetails.getStatus());
            booking.setTotalAmount(bookingDetails.getTotalAmount());
            booking.setPickupLocation(bookingDetails.getPickupLocation());
            booking.setCustomerEmail(bookingDetails.getCustomerEmail());
            booking.setUpdatedAt(java.time.LocalDateTime.now().toString());
            Booking updatedBooking = bookingRepo.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String id) {
        Optional<Booking> booking = bookingRepo.findById(id);
        if (booking.isPresent()) {
            bookingRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
