package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.Doctor;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.AuthServices;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins="*")
public class AuthController {

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    @Autowired
    private AuthServices authServices;

    @PostMapping(value="/signUp")
    public ResponseEntity<String> addUser(@RequestBody PetOwner user) {
        if(authServices.isUserExists(user.getUserPhone())) {
            return new ResponseEntity<>("User Already Exists", HttpStatus.BAD_REQUEST);
        } else {
            authServices.saveUser(user);
            return new ResponseEntity<>("User Added Successfully", HttpStatus.CREATED);
        }
    }

    @PostMapping(value="/signIn")
    public ResponseEntity<String> signIn(@RequestBody SignIn user) {
        return authServices.signIn(user);
    }
}
