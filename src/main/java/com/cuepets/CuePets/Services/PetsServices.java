package com.cuepets.CuePets.Services;


import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetsServices {
    @Autowired
    private PetsRepo petsRepo;

    public void savePets(Pets pet) {
            petsRepo.save(pet);
    }


}
