package com.company.places.service.impl;

import com.company.places.dto.*;
import com.company.places.entity.FavoritePlace;
import com.company.places.exception.*;
import com.company.places.mapper.FavoritePlaceMapper;
import com.company.places.repository.FavoritePlaceRepository;
import com.company.places.service.FavoritePlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FavoritePlaceServiceImpl implements FavoritePlaceService {

    private final FavoritePlaceRepository repository;
    private final FavoritePlaceMapper mapper;

    @Override
    @Transactional
    public FavoritePlaceResponse addFavorite(FavoritePlaceRequest request) {
        if (repository.existsByPlaceId(request.getPlaceId())) {
            throw new DuplicateResourceException("Place already in favorites: " + request.getPlaceId());
        }
        FavoritePlace saved = repository.save(mapper.toEntity(request));
        log.info("Saved favorite place {}", saved.getPlaceId());
        return mapper.toResponse(saved);
    }

    @Override
    public Page<FavoritePlaceResponse> getAllFavorites(Pageable pageable) {
        return repository.findAllByOrderByCreatedAtDesc(pageable).map(mapper::toResponse);
    }

    @Override
    public FavoritePlaceResponse getById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found: " + id));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Favorite not found: " + id);
        }
        repository.deleteById(id);
    }
}