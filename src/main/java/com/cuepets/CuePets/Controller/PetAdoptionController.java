package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetAdoption;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetAdoptionRepo;
import com.cuepets.CuePets.Repository.PetsRepo;
import com.cuepets.CuePets.Services.PetAdoptionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/adoption")
public class PetAdoptionController {
    @Autowired
    private PetAdoptionServices petAdoptionServices;

    @Autowired
    private PetAdoptionRepo petAdoptionRepo;

    @Autowired
    private PetsRepo petsRepo;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    @PostMapping(value="/addAdopt/{userid}/{petid}")
    public PetAdoption addForAdopt(@PathVariable(name="userid") String userId,@PathVariable(name="petid")String petId,@RequestBody PetAdoption petAdopt){
    petAdopt.setOwnerID(userId);
    petAdopt.setPetID(petId);
    petAdopt.setAdoptionStatus(true);
    petAdoptionRepo.save(petAdopt);
    Pets pet = petsRepo.findByPetID(petId);
    if(pet!=null){
        pet.setAdoptionStatus(true);
        petsRepo.save(pet);
    }else{
        LOGGER.error("Error");
    }
    return petAdoptionServices.addAdopt(petAdopt);
    }

    @GetMapping(value = "/availablePets")
    public List<Pets> getAvailablePetsForAdoption() {
        return petAdoptionServices.getAvailablePets();
    }



}
