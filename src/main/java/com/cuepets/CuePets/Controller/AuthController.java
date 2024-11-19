package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.Doctor;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.AuthServices;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins="*")

public class AuthController
{
    @Autowired
    private PetOwnerRepo petOwnerRepo;

    @Autowired
    private AuthServices authServices;

    @PostMapping(value="/signUp")
    public String addUser(@RequestBody PetOwner user)
    {
        if(authServices.isUserExists(user.getUserPhone()))
        {
            return "User Already Exist !!";
        }
        else
        {
            authServices.saveUser(user);
            return "User Added Successfully";
        }
    }

    @PostMapping(value="/signIn")
    public String signIn(@RequestBody SignIn user)
    {
        return authServices.signIn(user);
    }
}
