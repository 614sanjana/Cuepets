package com.cuepets.CuePets.Controller;

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

    @Autowired    //auto maps the method
    private PetsServices petsServices;

    @Autowired
    private PetsRepo petsRepo;


    @PostMapping(value="/addPets/{id}")      //when we are going to add pet, we'll also pass owner id
    private Pets addPets(@PathVariable(name="id")String id,@RequestBody Pets pet) {  //Pets is a class in model harshitha!!
        pet.setOwnerID(id);                             //setter setOwnerId is a setter method which is defined in the lombok with which we can set values to the variables of that object
        return petsServices.savePets(pet);                                                  //the object of the Pets class is passed to the methods
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
