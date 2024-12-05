package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.Doctor;
import com.cuepets.CuePets.Repository.DoctorRepo;
import com.cuepets.CuePets.Services.DoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/doctor")

public class DoctorController {
    @Autowired
    private DoctorServices doctorServices;

    @Autowired
    private DoctorRepo doctorRepo;

    @PostMapping(value="/addDoctor")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorServices.saveDoctor(doctor);
    }

    @GetMapping(value="/getDoctor")
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    @RequestMapping(value="/getDoctor/{id}")
    public Doctor getById(@PathVariable(name="id")String id) {
        return doctorServices.getDoctorByID(id);
    }
}
