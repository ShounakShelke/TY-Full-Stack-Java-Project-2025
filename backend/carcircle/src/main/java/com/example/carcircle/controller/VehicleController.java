package com.example.carcircle.controller;

import com.example.carcircle.model.Car;
import com.example.carcircle.model.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    @Autowired
    private CarRepository carRepo;

    @GetMapping
    public List<Car> getAll() {
        return carRepo.findAll();
    }

    @PostMapping
    public Car add(@RequestBody Car c) {
        return carRepo.save(c);
    }

    @GetMapping("/{id}")
    public Optional<Car> get(@PathVariable String id) {
        return carRepo.findById(id);
    }

    @PutMapping("/{id}")
    public Car update(@PathVariable String id, @RequestBody Car updated) {
        updated.setId(id);
        return carRepo.save(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        carRepo.deleteById(id);
    }
}
