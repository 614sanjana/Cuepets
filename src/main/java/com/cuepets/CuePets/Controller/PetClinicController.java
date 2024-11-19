package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetClinicRepo;
import com.cuepets.CuePets.Services.PetClinicServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/petClinic")

public class PetClinicController {


    @Autowired
    PetClinicServices petClinicServices;

    @Autowired
    PetClinicRepo petClinicRepo;

    @PostMapping(value="/addClinic")
    public PetClinic saveBreed(@RequestBody PetClinic clinic){
        return petClinicServices.clinicSave(clinic);
    }


}
