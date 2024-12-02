package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins="*")
public class AuthController{

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

    public ResponseEntity<String> signIn(SignIn user) {
        // Authenticate user and get the OwnerID
        String ownerId = authenticateUser(user);

        if (ownerId != null) {
            // If authentication is successful, you could return the OwnerID
            // Alternatively, you can generate a JWT token here
            return ResponseEntity.ok(ownerId);
        } else {
            // If authentication fails, return an error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    private String authenticateUser(SignIn user) {
        // Perform authentication logic here (e.g., check username/password, retrieve OwnerID)
        // For example:
        // If user is valid, return the corresponding ownerId, otherwise return null
        if ("validUsername".equals(user.getUsername()) && "validPassword".equals(user.getPassword())) {
            return "owner123"; // Sample OwnerID after successful authentication
        }
        return null;
    }
}
