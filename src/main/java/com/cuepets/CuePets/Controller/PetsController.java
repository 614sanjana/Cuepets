package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetsRepo;
import com.cuepets.CuePets.Services.PetsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/pets")

public class PetsController {

    @Autowired
    private PetsServices  petsServices;

    @Autowired
    private PetsRepo petsRepo;

    @PostMapping(value="/addPets")
    private void addPets(@RequestBody Pets pet) {  //Pets is a class in model harshitha!!
        petsServices.savePets(pet);               //the object of the Pets class is passed to the methods
    }

    @GetMapping(value="/getPets")
    public List<Pets>getAllPets(){
        return petsRepo.findAll();
    }

    @RequestMapping(value = "/getPets/{id}")
    public Pets getById(@PathVariable(name="id")String id){
        return petsServices.getPetsById(id);
    }

}
