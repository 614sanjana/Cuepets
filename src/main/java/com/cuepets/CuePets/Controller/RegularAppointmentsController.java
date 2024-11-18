package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.RegularAppointments;
import com.cuepets.CuePets.Services.RegularAppointmentsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/appointments")

public class RegularAppointmentsController {
    @Autowired
    RegularAppointmentsServices regularAppointmentsServices;

    @PostMapping(value="/addAppointment")
    private void addAppointment(@RequestBody RegularAppointments appointments){
        regularAppointmentsServices.saveAppointments(appointments);
    }
}

