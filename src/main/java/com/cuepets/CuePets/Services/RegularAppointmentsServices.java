package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.RegularAppointments;
import com.cuepets.CuePets.Repository.RegularAppointmentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegularAppointmentsServices {
    @Autowired
    private RegularAppointmentsRepo regularAppointmentsRepo;

    public void saveAppointments(RegularAppointments appointments,String ownerID,String petID) {
        appointments.setOwnerId(ownerID);
        appointments.setPetId(petID);
        regularAppointmentsRepo.save(appointments);
    }

    public ResponseEntity<List<PetHealthRecord>> getAllAppointments(String ownerId) {
        return regularAppointmentsRepo.findByOwnerId(ownerId);
    }
}
