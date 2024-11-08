package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetTypeRepo extends MongoRepository<PetType,String> {
}
