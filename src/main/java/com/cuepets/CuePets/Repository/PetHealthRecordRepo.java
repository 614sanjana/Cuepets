package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetHealthRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetHealthRecordRepo extends MongoRepository<PetHealthRecord, String> {
}
