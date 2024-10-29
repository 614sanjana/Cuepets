package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.Pets;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetsRepo extends MongoRepository<Pets,String> {
}
