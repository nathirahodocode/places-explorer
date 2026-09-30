package com.company.places.dto;

import lombok.*;
import java.time.Instant;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FavoritePlaceResponse {
    private Long id;
    private String placeId;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Instant createdAt;
}