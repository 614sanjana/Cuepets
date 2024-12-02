package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Repository.PetBreedRepo;
import com.cuepets.CuePets.Services.PetBreedServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/petBreed")
public class PetBreedController {

    @Autowired
    PetBreedServices petBreedServices;

    @Autowired
    private PetBreedRepo petBreedRepo;

    @PostMapping(value="/addBreed")
    public PetBreed saveBreed(@RequestBody PetBreed breed){
        return petBreedServices.breedSave(breed);
    }

    @GetMapping("/names")
    public List<String> getAllBreedNames() {
        // Retrieve all breeds and map to breedName
        return petBreedRepo.findAll()
                .stream()
                .map(PetBreed::getBreedName)
                .collect(Collectors.toList());
    }

}
