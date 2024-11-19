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



    public PetOwner getUserByID(String id) {
    return petOwnerRepo.findById(id).get();
    }
}
