package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetOwnerServices {
    @Autowired
     private PetOwnerRepo petOwnerRepo;

    public void saveUser(PetOwner user){
        petOwnerRepo.save(user);
    }

    public Iterable<PetOwner> listAll() {
        return this.petOwnerRepo.findAll();
    }

    public void deleteUser(String phone) {
        petOwnerRepo.deleteById(phone);
    }

    public PetOwner getUserByID(String phone) {
        return petOwnerRepo.findById(phone).get();
    }
}
