package com.company.places.controller;

import com.company.places.service.GooglePlacesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
public class PlacesProxyController {

    private final GooglePlacesService googlePlacesService;

    @GetMapping("/{placeId}")
    public ResponseEntity<Map<String, Object>> details(@PathVariable String placeId) {
        return ResponseEntity.ok(googlePlacesService.getPlaceDetails(placeId));
    }
}