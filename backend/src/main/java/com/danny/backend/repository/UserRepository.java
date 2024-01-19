package com.danny.backend.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.danny.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByCustomerID(String customerID);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
