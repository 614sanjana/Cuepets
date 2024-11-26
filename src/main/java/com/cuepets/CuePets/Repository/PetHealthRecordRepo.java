package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetHealthRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PetHealthRecordRepo extends MongoRepository<PetHealthRecord, String> {
    List<PetHealthRecord> findByPetID(String petId);
}
