package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class PetOwnerController {

    @Autowired
    private PetOwnerServices petOwnerServices;

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    /**
     * Fetch all users.
     */
    @GetMapping(value = "/getUsers")
    public ResponseEntity<List<PetOwner>> getAllUsers() {
        List<PetOwner> users = petOwnerRepo.findAll();
        return ResponseEntity.ok(users);
    }

    /**
     * Endpoint to set the profile picture of a user.
     *
     * @param id   The user's ID.
     * @param file The profile picture file.
     * @return A success or failure message.
     */
    @PostMapping(value = "/setPfp/{id}")
    public ResponseEntity<String> setProfilePicture(
            @PathVariable(name = "id") String id,
            @RequestParam("file") MultipartFile file) {
        try {
            // Call the service to store the profile picture
            return petOwnerServices.storeProfilePicture(id, file); // Return the response from the service
        } catch (Exception e) {
            // Log the error and return an appropriate response
            LOGGER.error("Error uploading profile picture for user ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Failed to upload profile picture. Error: " + e.getMessage());
        }
    }
}
