package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetHealthRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PetHealthRecordRepo extends MongoRepository<PetHealthRecord, String> {
    Optional<Object> findByRecordID(String recordID);

    List<PetHealthRecord> findByPetID(String petId);

    boolean existsByRecordID(String recordID);

    void deleteByRecordID(String recordID);
}
