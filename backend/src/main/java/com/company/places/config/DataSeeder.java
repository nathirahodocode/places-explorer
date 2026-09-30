package com.company.places.config;

import com.company.places.entity.User;
import com.company.places.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties props;

    @Override
    public void run(String... args) {
        String username = props.getSecurity().getDefaultUser().getUsername();
        if (userRepository.findByUsername(username).isEmpty()) {
            userRepository.save(User.builder()
                    .username(username)
                    .passwordHash(passwordEncoder.encode(props.getSecurity().getDefaultUser().getPassword()))
                    .role("USER")
                    .build());
            log.info("Seeded default user '{}'", username);
        }
    }
}