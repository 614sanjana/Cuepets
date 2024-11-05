package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetOwnerServices {
    @Autowired
     private PetOwnerRepo petOwnerRepo;


    public void saveUser(PetOwner user){
        petOwnerRepo.save(user);
    }

    public PetOwner getUserByID(String id) {
    return petOwnerRepo.findById(id).get();
    }
}
