package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetAdoptionRepo;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Repository.PetsRepo;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class PetOwnerController {

    @Autowired
    private PetOwnerServices petOwnerServices;

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    @Autowired
    private PetsRepo petsRepo;

    @Autowired
    private PetAdoptionRepo petAdoptionRepo;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    /**
     * Fetch all users.
     */
    @GetMapping(value = "/getUsers")
    public ResponseEntity<List<PetOwner>> getAllUsers() {
        List<PetOwner> users = petOwnerRepo.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/getUsersByID/{id}")
    public ResponseEntity<PetOwner> getUserById(@PathVariable("id") String id) {
        PetOwner user = petOwnerRepo.findByOwnerID(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
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

    /*
       Endpoint to delete the user data as per the ID
    */
    @DeleteMapping(value = "/deleteUser/{id}")
    public ResponseEntity<String> deleteUserByID(@PathVariable(name = "id") String id) {
        try {
            String result = petOwnerServices.deleteUserByID(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete user and associated data. Error: " + e.getMessage());
        }
    }

    @GetMapping("/viewImage/{ownerID}")
    public ResponseEntity<Resource> viewUserPfpImage(@PathVariable String ownerID) {
        return petOwnerServices.viewUserImage(ownerID);
    }

    @GetMapping("/getUserName/{ownerID}")
    public ResponseEntity<String> getUserNameByID(@PathVariable String ownerID){
        PetOwner owner = petOwnerRepo.findByOwnerID(ownerID);
        if (owner != null) {
            return ResponseEntity.ok(owner.getUserName()); // Return 200 OK with the petID
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"); // Return 404 with error message
        }
    }
}
