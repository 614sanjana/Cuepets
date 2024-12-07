package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetBreed;
import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetsRepo;
import com.cuepets.CuePets.Services.PetsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/pets")
public class PetsController {

    @Autowired
    private PetsServices petsServices;

    @Autowired
    private PetsRepo petsRepo;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    // Endpoint to add a new pet
    @PostMapping("/addPet/{id}")
    public ResponseEntity<String> addPet(@PathVariable(name="id") String id,@RequestBody Pets pet) {
        try {
            Pets savedPet = petsServices.savePets(pet,id);
            String petId=savedPet.getPetID();
            petsServices.createPetsFolder(petId,id);
            return new ResponseEntity<>("Pet added successfully with ID: " + savedPet.getPetID(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding pet: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/setPfp/{id}")
    public ResponseEntity<String> setProfilePicture(
            @PathVariable(name = "id") String id,
            @RequestParam("file") MultipartFile file) {
        try {
            // Call the service to store the profile picture
            return petsServices.storeProfilePicture(id, file); // Return the response from the service
        } catch (Exception e) {
            // Log the error and return an appropriate response
            LOGGER.error("Error uploading profile picture for user ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Failed to upload profile picture. Error: " + e.getMessage());
        }
    }


    // Endpoint to fetch pet by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getPetById(@PathVariable("id") String id) {
        try {
            Pets pet = petsServices.getPetsById(id);
            return new ResponseEntity<>(pet, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Pet not found with ID: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/allPets/{ownerId}")
    public ResponseEntity<Object> getAllPetsByOwnerId(@PathVariable("ownerId") String ownerId) {
        try {
            List<Pets> petsList = petsServices.getPetsByOwnerId(ownerId);
            if (petsList.isEmpty()) {
                return new ResponseEntity<>("No pets found for owner ID: " + ownerId, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(petsList, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error fetching pets for owner ID {}: {}", ownerId, e.getMessage());
            return new ResponseEntity<>("Error fetching pets: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/viewImage/{petID}")
    public ResponseEntity<Resource> viewPetPfpImage(@PathVariable String petID) {
        return petsServices.viewPetImage(petID);
    }

    @GetMapping("/names/{ownerID}")
    public List<String> getAllPetsNames(@PathVariable String ownerID) {
        // Retrieve all pets for the given ownerID and map to petName
        return petsRepo.findAll()
                .stream()
                .filter(pet -> pet.getOwnerID().equals(ownerID)) // Filter by ownerID
                .map(Pets::getPetName) // Map to petName
                .collect(Collectors.toList()); // Collect as a list
    }

    @GetMapping("/getPetID/{petName}")
    public ResponseEntity<String> getPetID(@PathVariable(name = "petName") String petName) {
        Pets pet = petsRepo.findByPetName(petName);
        if (pet != null) {
            return ResponseEntity.ok(pet.getPetID()); // Return 200 OK with the petID
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found"); // Return 404 with error message
        }
    }


}
