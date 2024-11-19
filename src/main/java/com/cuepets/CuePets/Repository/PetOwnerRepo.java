package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetOwner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetOwnerRepo extends MongoRepository<PetOwner,String> {
    boolean existsByOwnerID(String ownerID);

    boolean existsByuserPhone(String userPhone);

    PetOwner findByuserPhone(String userPhone);
}
