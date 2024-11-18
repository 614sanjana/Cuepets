package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DoctorRepo extends MongoRepository<Doctor,String> {
    boolean existsByDoctorID(String doctorID);
}
