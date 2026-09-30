package com.company.places.service;

import com.company.places.config.AppProperties;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GooglePlacesService {

    private final RestClient restClient;
    private final AppProperties props;

    @Cacheable(value = "places", key = "#placeId")
    @Retry(name = "googlePlaces")
    @CircuitBreaker(name = "googlePlaces", fallbackMethod = "fallback")
    @SuppressWarnings("unchecked")
    public Map<String, Object> getPlaceDetails(String placeId) {
        log.debug("Calling Google Place Details for {}", placeId);
        String url = props.getGoogle().getPlacesBaseUrl()
                + "/details/json?place_id=" + placeId
                + "&key=" + props.getGoogle().getApiKey();
        return restClient.get().uri(url).retrieve().body(Map.class);
    }

    @SuppressWarnings("unused")
    private Map<String, Object> fallback(String placeId, Throwable t) {
        log.warn("Fallback triggered for {}: {}", placeId, t.getMessage());
        return Map.of("status", "UNAVAILABLE", "placeId", placeId);
    }
}