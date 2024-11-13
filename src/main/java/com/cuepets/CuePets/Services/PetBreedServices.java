package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Repository.PetBreedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PetBreedServices {
    @Autowired
    private PetBreedRepo breedRepo;

    private static final int MIN = 1;
    private static final int MAX = 99999999;

    public String generateUniqueBreedID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (breedRepo.existsByBreedID(generatedID));
        return generatedID;
    }

    public PetBreed breedSave(PetBreed breed){
        breed.setBreedID(generateUniqueBreedID());
        breedRepo.save(breed);
        return breed;
    }




}
