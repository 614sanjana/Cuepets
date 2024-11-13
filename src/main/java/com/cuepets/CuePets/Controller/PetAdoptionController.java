package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetAdoption;
import com.cuepets.CuePets.Repository.PetAdoptionRepo;
import com.cuepets.CuePets.Services.PetAdoptionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/adoption")
public class PetAdoptionController {
    @Autowired
    private PetAdoptionServices petAdoptionServices;

    @PostMapping(value="/addAdopt/{userid}/{petid}")
    public PetAdoption addForAdopt(@PathVariable(name="userid") String userId,@PathVariable(name="petid")String petId,@RequestBody PetAdoption petAdopt){
    petAdopt.setOwnerID(userId);
    petAdopt.setPetID(petId);
    return petAdoptionServices.addAdopt(petAdopt);
    }

}
