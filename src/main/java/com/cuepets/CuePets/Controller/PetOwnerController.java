package com.cuepets.CuePets.Controller;



import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/user")

public class PetOwnerController {    // check whether you can change the name as PetOwnerController

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private PetOwnerServices petOwnerServices;

    @Autowired
    private PetOwnerRepo petOwnerRepo;


    @PostMapping(value="/addUsers")
    public void addUsers(@RequestBody PetOwner user) {
        petOwnerServices.saveUser(user);
    }

    @GetMapping(value="/getUsers")
    public List<PetOwner> getAllUsers() {
        return petOwnerRepo.findAll();
    }

    @RequestMapping(value="/getUsers/{id}")
    public PetOwner getById(@PathVariable(name="id")String id) {
        return petOwnerServices.getUserByID(id);
    }


}
