package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.VaccineAppointments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VaccineAppointmentsRepo extends MongoRepository<VaccineAppointments,String> {
}
