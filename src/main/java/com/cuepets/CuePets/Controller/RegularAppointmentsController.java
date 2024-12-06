package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Model.RegularAppointments;
import com.cuepets.CuePets.Repository.RegularAppointmentsRepo;
import com.cuepets.CuePets.Services.RegularAppointmentsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/appointments")

public class RegularAppointmentsController {
    @Autowired
    RegularAppointmentsServices regularAppointmentsServices;

    @Autowired
    RegularAppointmentsRepo regularAppointmentsRepo;

    @PostMapping(value="/addAppointment/{ownerId}/{petId}")
    private void addAppointment(@RequestBody RegularAppointments appointments,@PathVariable(name="ownerId")String ownerID,@PathVariable(name="petId")String petID){
        regularAppointmentsServices.saveAppointments(appointments,ownerID,petID);
    }

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);


    @GetMapping("/getAppointments/{ownerId}")
    public ResponseEntity<List<PetHealthRecord>> getPetAppointments(@PathVariable(name = "ownerId") String ownerId)
    {
        return regularAppointmentsServices.getAllAppointments(ownerId);
    }
}

