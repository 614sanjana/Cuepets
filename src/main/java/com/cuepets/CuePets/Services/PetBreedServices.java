package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Repository.PetBreedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetBreedServices {
    @Autowired
    private PetBreedRepo breedRepo;


    public void breedSave(PetBreed breed){
        breedRepo.save(breed);
    }


}
