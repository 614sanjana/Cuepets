package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.Doctor;
import com.cuepets.CuePets.Repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class DoctorServices {

    @Autowired
    private DoctorRepo doctorRepo;

    private static final int MIN = 1;
    private static final int MAX = 99999;

    public String generateUniqueDoctorID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (doctorRepo.existsByDoctorID(generatedID));
        return generatedID;
    }

    public Doctor saveDoctor(Doctor doctor){
        doctor.setDoctorID(generateUniqueDoctorID());
        doctorRepo.save(doctor);
        return doctor;
    }

    public Doctor getDoctorByID(String id) {
        return doctorRepo.findById(id).get();
    }

}
