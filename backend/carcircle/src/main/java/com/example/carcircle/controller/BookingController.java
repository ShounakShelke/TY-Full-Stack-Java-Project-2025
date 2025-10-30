package com.example.carcircle.controller;

import com.example.carcircle.model.Booking;
import com.example.carcircle.model.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepo;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    @PostMapping
    public Booking addBooking(@RequestBody Booking booking) {
        return bookingRepo.save(booking);
    }
}
