package com.company.places.mapper;

import com.company.places.dto.*;
import com.company.places.entity.FavoritePlace;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface FavoritePlaceMapper {
    FavoritePlace toEntity(FavoritePlaceRequest request);
    FavoritePlaceResponse toResponse(FavoritePlace entity);
}