package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetClinic;
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

        /**
         * Save clinic details to the database.
         * @param clinic The clinic object to save.
         * @return ResponseEntity containing success or error message.
         */
    public void clinicSave(PetClinic clinic)
    {
                // Save the clinic object
            clinic.setClinicID(generateUniqueClinicID());
            petClinicRepo.save(clinic);
    }
}


