package com.company.places.service;

import com.company.places.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FavoritePlaceService {
    FavoritePlaceResponse addFavorite(FavoritePlaceRequest request);
    Page<FavoritePlaceResponse> getAllFavorites(Pageable pageable);
    FavoritePlaceResponse getById(Long id);
    void deleteById(Long id);
}