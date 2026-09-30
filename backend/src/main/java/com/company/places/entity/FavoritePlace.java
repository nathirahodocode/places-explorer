package com.company.places.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "favorite_places")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FavoritePlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "place_id", nullable = false, unique = true, length = 255)
    private String placeId;

    @Column(nullable = false, length = 500)
    private String name;

    @Column(length = 1000)
    private String address;

    private Double latitude;
    private Double longitude;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}