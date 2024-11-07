package com.cuepets.CuePets.Repository;

import com.mongodb.client.MongoDatabase;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetType extends MongoRepository<PetType, String> {
}
