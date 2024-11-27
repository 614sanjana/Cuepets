package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetAdoption;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetAdoptionRepo extends MongoRepository<PetAdoption,String> {
    boolean existsByownerID(String id);

    void deleteByownerID(String id);

    void deleteByOwnerID(String id);
}
