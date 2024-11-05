package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.RegularAppointments;
import com.cuepets.CuePets.Repository.RegularAppointmentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegularAppointmentsServices {
    @Autowired
    private RegularAppointmentsRepo regularAppointmentsRepo;

    public void saveAppointments(RegularAppointments appointments) {
        regularAppointmentsRepo.save(appointments);
    }
}
