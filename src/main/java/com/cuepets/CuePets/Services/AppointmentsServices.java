package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Appointments;
import com.cuepets.CuePets.Repository.AppointmentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AppointmentsServices {
    @Autowired
    private AppointmentsRepo appointmentsRepo;

    public void saveAppointments(Appointments appointments, String ownerID, String petID) {
        appointments.setOwnerId(ownerID);
        appointments.setPetId(petID);
        appointments.setAppointmentId(UUID.randomUUID().toString());
        appointmentsRepo.save(appointments);
    }

    public ResponseEntity<List<PetHealthRecord>> getAllAppointments(String ownerId) {
        return appointmentsRepo.findByOwnerId(ownerId);
    }
}
