package com.cuepets.CuePets.Services;


import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PetsServices {
    @Autowired
    private PetsRepo petsRepo;


    private static final int MIN = 1;
    private static final int MAX = 999999;

    public String generateUniquePetID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petsRepo.existsByPetID(generatedID));
        return generatedID;
    }

    public Pets savePets(Pets pet){
        pet.setPetID(generateUniquePetID());
        petsRepo.save(pet);
        return pet;
    }
    public Pets getPetsById(String id){
        return petsRepo.findById(id).get();
    }

}
