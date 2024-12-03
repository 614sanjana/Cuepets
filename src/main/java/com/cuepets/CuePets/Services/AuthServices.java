package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
public class AuthServices {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    private static final int MIN = 00001;
    private static final int MAX = 99999;

    public String generateUniqueOwnerID() {
        Random random = new Random();
        String generatedID;
        do {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petOwnerRepo.existsByOwnerID(generatedID));
        return generatedID;
    }

    public void saveUser(PetOwner user) {
        String userID = generateUniqueOwnerID();
        String hashedPass = bCryptPasswordEncoder.encode(user.getUserPassword());
        user.setUserPassword(hashedPass);
        user.setOwnerID(userID);
        petOwnerRepo.save(user);
        createUserFolder(userID);
    }

    private void createUserFolder(String userID) {
        String baseDirectory = "src/main/resources/AssetData"; // Change this path as needed for your environment

        try {
            // Create the directory path
            Path userFolderPath = Paths.get(baseDirectory, userID);

            // Create directories if they do not exist
            Files.createDirectories(userFolderPath);

            System.out.println("Folder created at: " + userFolderPath.toString());
        } catch (Exception e) {
            System.err.println("Failed to create user folder for Owner ID: " + userID);
            e.printStackTrace();
        }
    }

    public boolean isUserExists(String userPhone) {
        return petOwnerRepo.existsByuserPhone(userPhone);
    }

//    public ResponseEntity<String> signIn(SignIn signIn) {
//        String userPhoneNo = signIn.getUserPhone();
//        String userPass = signIn.getUserPass();
//
//        if (userPass == null || userPass.isEmpty()) {
//            return new ResponseEntity<>("Password cannot be null or empty!", HttpStatus.BAD_REQUEST);
//        }
//
//        PetOwner user = petOwnerRepo.findByuserPhone(userPhoneNo);
//        if (user != null) {
//            String hashedPassword = user.getUserPassword();
//            if (bCryptPasswordEncoder.matches(userPass, hashedPassword)) {
//                return new ResponseEntity<>("Login Successfully", HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
//            }
//        } else {
//            return new ResponseEntity<>("No User Found", HttpStatus.NOT_FOUND);
//        }
//    }
//
//    public SignIn signInUser(String userPhone, String userPass) {
//    }


    public PetOwner authenticateUser(String userPhone, String userPass) {
        // Fetch user by phone
        PetOwner petOwner = petOwnerRepo.findById(userPhone).orElse(null);
        if (petOwner != null && bCryptPasswordEncoder.matches(userPass, petOwner.getUserPassword()))
        {
            return petOwner;
        }
        return null; // Invalid credentials
    }
}
