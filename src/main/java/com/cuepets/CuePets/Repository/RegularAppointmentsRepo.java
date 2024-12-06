package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.RegularAppointments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RegularAppointmentsRepo extends MongoRepository<RegularAppointments,String> {

    List<RegularAppointments> findByPetId(String petId);

    ResponseEntity<List<PetHealthRecord>> findByOwnerId(String ownerId);
}
