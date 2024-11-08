package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Services.PetBreedServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/petbreed")
public class PetBreedController {
    @Autowired
    private PetBreedServices petBreedServices;

    @PostMapping(value="/addBreed")
    public void addBreed(@RequestBody PetBreed petBreed){
    PetBreedServices.saveBreed(petBreed);
    }
}
