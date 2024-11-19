package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.VaccineAppointments;
import com.cuepets.CuePets.Services.VaccineAppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/vaccineAppointment")
public class VaccineAppointmentController {
    @Autowired
    VaccineAppointmentServices vaccineAppointmentsServices;

    @PostMapping(value="/addAppointment")
    private void addAppointment(@RequestBody VaccineAppointments appointments){
        vaccineAppointmentsServices.saveAppointments(appointments);
    }
}
