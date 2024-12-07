package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Appointments;
import com.cuepets.CuePets.Repository.AppointmentsRepo;
import com.cuepets.CuePets.Services.AppointmentsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/appointments")

public class AppointmentsController {
    @Autowired
    AppointmentsServices appointmentsServices;

    @Autowired
    AppointmentsRepo appointmentsRepo;

    @PostMapping(value="/addAppointment/{ownerId}/{petId}")
    private void addAppointment(@RequestBody Appointments appointments, @PathVariable(name="ownerId")String ownerID, @PathVariable(name="petId")String petID){
        appointmentsServices.saveAppointments(appointments,ownerID,petID);
    }

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);


    @GetMapping("/getAppointments/{ownerId}")
    public ResponseEntity<List<PetHealthRecord>> getPetAppointments(@PathVariable(name = "ownerId") String ownerId)
    {
        return appointmentsServices.getAllAppointments(ownerId);
    }
}

