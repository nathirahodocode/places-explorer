package com.company.places.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FavoritePlaceRequest {

    @NotBlank(message = "placeId is required")
    @Size(max = 255)
    private String placeId;

    @NotBlank(message = "name is required")
    @Size(max = 500)
    private String name;

    @Size(max = 1000)
    private String address;

    @DecimalMin("-90.0") @DecimalMax("90.0")
    private Double latitude;

    @DecimalMin("-180.0") @DecimalMax("180.0")
    private Double longitude;
}