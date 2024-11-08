package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Services.PetBreedServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/petBreed")
public class PetBreedController {

    @Autowired
    PetBreedServices petBreedServices;

    @PostMapping(value="/addBreed")
    public void saveBreed(@RequestBody PetBreed breed){
        petBreedServices.breedSave(breed);
    }
}
