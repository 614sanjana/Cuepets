package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetAdoption;
import com.cuepets.CuePets.Model.Pets;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PetAdoptionRepo extends MongoRepository<PetAdoption,String> {
    boolean existsByownerID(String id);

    void deleteByownerID(String id);

    void deleteByOwnerID(String id);
}
