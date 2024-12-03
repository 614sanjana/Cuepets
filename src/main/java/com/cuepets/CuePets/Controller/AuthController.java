package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.AuthServices;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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
    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody SignIn request) {
        // Authenticate user
        PetOwner petOwner = authServices.authenticateUser(request.getUserPhone(), request.getUserPass());
        if (petOwner != null) {
            // Construct response with ownerID
            Map<String, Object> response = new HashMap<>();
            response.put("ownerID", petOwner.getOwnerID());
            response.put("userName", petOwner.getUserName());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("Logged out successfully");
    }



}
