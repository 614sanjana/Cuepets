package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Services.PetClinicServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/petClinic")

public class PetClinicController {
    @Autowired
    PetClinicServices petClinicServices;

    @PostMapping(value="/addClinic")
    private void addClinic(@RequestBody PetClinic clinic){
        petClinicServices.saveClinic(clinic);
    }

}
