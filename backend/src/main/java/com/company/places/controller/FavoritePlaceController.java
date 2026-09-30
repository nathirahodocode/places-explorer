package com.company.places.controller;

import com.company.places.dto.*;
import com.company.places.service.FavoritePlaceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoritePlaceController {

    private final FavoritePlaceService service;

    @PostMapping
    public ResponseEntity<FavoritePlaceResponse> add(@Valid @RequestBody FavoritePlaceRequest req) {
        FavoritePlaceResponse created = service.addFavorite(req);
        return ResponseEntity.created(URI.create("/api/v1/favorites/" + created.getId())).body(created);
    }

    @GetMapping
    public ResponseEntity<Page<FavoritePlaceResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(service.getAllFavorites(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoritePlaceResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}