package com.cuepets.CuePets.Controller;

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
    private void addClinic(@RequestBody PetClinic clinic){
        petClinicServices.saveClinic(clinic);
    }

    @GetMapping(value="/getClinic")
    public List<PetClinic> getAllClinic() {   // returning whole class to the list...
        return petClinicRepo.findAll();       // find all is a mongoDb func which is being extended in repo
    }

    @RequestMapping(value="/getClinic/{id}")
    public PetClinic getById(@PathVariable(name="id")String id) {
        return petClinicServices.getClinicById(id);
    }



}
