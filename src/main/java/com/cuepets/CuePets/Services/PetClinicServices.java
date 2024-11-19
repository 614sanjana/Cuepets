package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetClinic;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetClinicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PetClinicServices {
    @Autowired
    private PetClinicRepo petClinicRepo;
    private final static int MIN=001;
    private final static int MAX=100;

    public String generateUniqueClinicID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petClinicRepo.existsByClinicID(generatedID));
        return generatedID;
    }

    public PetClinic clinicSave(PetClinic clinic){
        clinic.setClinicID(generateUniqueClinicID());
        petClinicRepo.save(clinic);
        return clinic;
    }

}
