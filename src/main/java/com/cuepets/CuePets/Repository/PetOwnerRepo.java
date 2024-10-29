package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetOwner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetOwnerRepo extends MongoRepository<PetOwner,String> {

}
