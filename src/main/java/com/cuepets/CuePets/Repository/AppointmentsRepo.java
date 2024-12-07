package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Appointments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AppointmentsRepo extends MongoRepository<Appointments,String> {

    List<Appointments> findByPetId(String petId);

    List<Appointments> findByOwnerId(String ownerId);
}
