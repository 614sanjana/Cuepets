package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Repository.PetClinicRepo;
import com.cuepets.CuePets.Services.PetClinicServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/petClinic")
public class PetClinicController {

    @Autowired
    PetClinicServices petClinicServices;

    @Autowired
    PetClinicRepo petClinicRepo;

    @PostMapping(value = "/addClinic")
    public ResponseEntity<String> saveClinic(@RequestBody PetClinic clinic)
    {
        try
        {
            petClinicServices.clinicSave(clinic);
            return ResponseEntity.status(HttpStatus.CREATED).body("Saved the clinic !!");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save clinic: " + e.getMessage());
        }
    }
}
