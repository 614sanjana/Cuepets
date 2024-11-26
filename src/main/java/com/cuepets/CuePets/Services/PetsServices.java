package com.cuepets.CuePets.Services;


import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import com.cuepets.CuePets.Repository.PetsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
public class PetsServices {
    @Autowired
    private PetsRepo petsRepo;

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    private static final int MIN = 1;
    private static final int MAX = 999999;

    public String generateUniquePetID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petsRepo.existsByPetID(generatedID));
        return generatedID;
    }

    public Pets savePets(Pets pet,String ownerID){
        pet.setPetID(generateUniquePetID());
        pet.setOwnerID(ownerID);
        petsRepo.save(pet);
        return pet;
    }

    public Pets getPetsById(String id){
        return petsRepo.findById(id).get();
    }

    public ResponseEntity<String> createPetsFolder(String petID,String ownerID) {
        try {
            // Fetch the pet from the database using petID
            Pets pet = petsRepo.findByPetID(petID);

            // Check if the pet exists
            if (pet == null) {
                String errorMessage = "No pet found for the given Pet ID: " + petID;
                return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
            }

            // Define the base directory path
            String baseDirectory = "src/main/resources/AssetData/"+ownerID+"/Pets"; // Adjust this path as needed for your environment

            // Create the directory path using ownerID
            Path petsFolderPath = Paths.get(baseDirectory, petID);

            // Create directories if they do not exist
            Files.createDirectories(petsFolderPath);

            String successMessage = "Folder created at: " + petsFolderPath.toString();
            return new ResponseEntity<>(successMessage, HttpStatus.CREATED);

        } catch (Exception e) {
            String errorMessage = "Failed to create user folder for Pet ID: " + petID;
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<String> storeProfilePicture(String petId, MultipartFile file) {
        try {
            // Check if the file is empty
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot store the profile picture.");
            }
            Pets pet = petsRepo.findByPetID(petId);
            String ownerID = pet.getOwnerID();

            // Define the base directory
            String baseDirectory = "src/main/resources/AssetData/"+ownerID+"/Pets/"+petId;

            // Create the directory path
            Path petProfileFolderPath = Paths.get(baseDirectory, "PetProfile");

            // Ensure the directory exists
            if (!Files.exists(petProfileFolderPath)) {
                Files.createDirectories(petProfileFolderPath);
            }

            // Create a unique filename
            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String uniqueFileName = petId + fileExtension;

            // Define the target path
            Path targetPath = Paths.get(petProfileFolderPath.toString(), uniqueFileName);

            // Check if the file already exists
            if (Files.exists(targetPath)) {
                Files.delete(targetPath); // Delete the existing file
            }

            // Save the new file
            Files.copy(file.getInputStream(), targetPath);

            // Update the user's profile picture path in the database
            Pets updatePet = petsRepo.findByPetID(petId);
            if (updatePet != null) {
                updatePet.setPetProfile(uniqueFileName);
                return ResponseEntity.status(HttpStatus.OK).body("Profile picture stored successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error storing the profile picture: " + e.getMessage());
        }
    }

    private String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex != -1 && lastDotIndex < fileName.length() - 1) {
            return fileName.substring(lastDotIndex);
        }
        return "";
    }

    public void savePet(Pets pet) {
        pet.setPetID(generateUniquePetID());
        petsRepo.save(pet);
    }
}
