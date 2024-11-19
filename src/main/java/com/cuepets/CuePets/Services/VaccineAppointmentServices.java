package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.RegularAppointments;
import com.cuepets.CuePets.Model.VaccineAppointments;
import com.cuepets.CuePets.Repository.VaccineAppointmentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VaccineAppointmentServices {

    @Autowired
    private VaccineAppointmentsRepo vaccineAppointmentsRepo;

    public void saveAppointments(VaccineAppointments appointments) {
        vaccineAppointmentsRepo.save(appointments);
    }
}

