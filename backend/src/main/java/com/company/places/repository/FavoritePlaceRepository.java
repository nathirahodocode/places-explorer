package com.company.places.repository;

import com.company.places.entity.FavoritePlace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritePlaceRepository extends JpaRepository<FavoritePlace, Long> {
    boolean existsByPlaceId(String placeId);
    Page<FavoritePlace> findAllByOrderByCreatedAtDesc(Pageable pageable);
}