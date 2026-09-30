package com.company.places.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Getter @Setter
public class AppProperties {
    private Security security = new Security();
    private Google google = new Google();

    @Getter @Setter
    public static class Security {
        private Jwt jwt = new Jwt();
        private DefaultUser defaultUser = new DefaultUser();
    }

    @Getter @Setter
    public static class Jwt {
        private String secret;
        private long expirationMs;
    }

    @Getter @Setter
    public static class DefaultUser {
        private String username;
        private String password;
    }

    @Getter @Setter
    public static class Google {
        private String apiKey;
        private String placesBaseUrl;
    }
}