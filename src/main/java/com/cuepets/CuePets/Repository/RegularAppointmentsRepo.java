package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.RegularAppointments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegularAppointmentsRepo extends MongoRepository<RegularAppointments,String> {

}
