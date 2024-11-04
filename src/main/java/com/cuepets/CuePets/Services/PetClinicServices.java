package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Repository.PetClinicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetClinicServices {
    @Autowired
    private PetClinicRepo petClinicRepo;

    public void saveClinic(PetClinic clinic){
        petClinicRepo.save(clinic);
    }

}
