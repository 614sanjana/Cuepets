package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PetOwnerServices {

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    private static final int MIN = 1;
    private static final int MAX = 99999;

    public String generateUniqueOwnerID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petOwnerRepo.existsByOwnerID(generatedID));
        return generatedID;
    }

    public PetOwner saveUser(PetOwner user){
        user.setOwnerID(generateUniqueOwnerID());
        petOwnerRepo.save(user);
        return user;
    }

    public PetOwner getUserByID(String id) {
    return petOwnerRepo.findById(id).get();
    }
}
