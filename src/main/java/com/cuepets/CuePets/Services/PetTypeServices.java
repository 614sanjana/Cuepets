package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetType;
import com.cuepets.CuePets.Repository.PetTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetTypeServices {
    @Autowired
    private PetTypeRepo petTypeRepo;

    public void saveType(PetType type){
        petTypeRepo.save(type);
    }

    public PetType getTypeById(String id){
        return petTypeRepo.findById(id).get();
    }

   // public void deleteType(String id){
        //petTypeRepo.delete(id);

}
