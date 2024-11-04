package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetClinic;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetClinicRepo extends MongoRepository<PetClinic, String> {
}
