package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetBreed;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetBreedRepo extends MongoRepository<PetBreed, String> {
    boolean existsByBreedID(String generatedID);
}
