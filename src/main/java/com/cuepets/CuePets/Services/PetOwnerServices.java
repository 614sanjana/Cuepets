package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PetOwnerServices {

    @Autowired
    private PetOwnerRepo petOwnerRepo; // Assume this is your MongoRepository for PetOwner

    public ResponseEntity<String> storeProfilePicture(String userId, MultipartFile file) {
        try {
            // Check if the file is empty
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot store the profile picture.");
            }

            // Define the base directory
            String baseDirectory = "src/main/resources/AssetData/" + userId;

            // Create the directory path
            Path userFolderPath = Paths.get(baseDirectory, "User");

            // Ensure the directory exists
            if (!Files.exists(userFolderPath)) {
                Files.createDirectories(userFolderPath);
            }

            // Create a unique filename
            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String uniqueFileName = userId + fileExtension;

            // Define the target path
            Path targetPath = Paths.get(userFolderPath.toString(), uniqueFileName);

            // Check if the file already exists
            if (Files.exists(targetPath)) {
                Files.delete(targetPath); // Delete the existing file
            }

            // Save the new file
            Files.copy(file.getInputStream(), targetPath);

            // Update the user's profile picture path in the database
            PetOwner user = petOwnerRepo.findByOwnerID(userId);
            if (user != null) {
                user.setPfpLocation(uniqueFileName);
                petOwnerRepo.save(user); // Save the updated user to the database
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            return ResponseEntity.status(HttpStatus.OK).body("Profile picture stored successfully.");

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
}
