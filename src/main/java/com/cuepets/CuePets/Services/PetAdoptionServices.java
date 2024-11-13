package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetAdoption;
import com.cuepets.CuePets.Repository.PetAdoptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PetAdoptionServices {
    @Autowired
    private PetAdoptionRepo petAdoptionRepo;

    private static final int MIN = 1;
    private static final int MAX = 99999;

    public String generateUniqueAdoptionID() {
        Random random = new Random();
        String generatedID;
        do {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petAdoptionRepo.existsById(generatedID));
        return generatedID;
    }

    public PetAdoption addAdopt(PetAdoption newAdopt)
    {
        newAdopt.setAdoptionID(generateUniqueAdoptionID());
        petAdoptionRepo.save(newAdopt);
        return newAdopt;
    }

}
