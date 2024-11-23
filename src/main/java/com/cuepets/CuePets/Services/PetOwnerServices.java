package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class PetOwnerServices {

    @Autowired
    private PetOwnerRepo petOwnerRepo;
    
    private final String baseLocation = "src/main/resources/"+;

    public PetOwnerServices() {
        // Ensure the directory exists
        File directory = new File(baseLocation);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    /**
     * Fetch a user by ID.
     *
     * @param id User ID.
     * @return PetOwner object.
     */
    public PetOwner getUserByID(String id) {
        Optional<PetOwner> user = petOwnerRepo.findById(id);
        return user.orElse(null);
    }

    /**
     * Store the profile picture for the given user.
     *
     * @param userId The user's ID.
     * @param file   The profile picture file.
     * @return The relative path of the stored profile picture.
     * @throws IOException If file storage fails.
     */
    public String storeProfilePicture(String userId, MultipartFile file) throws IOException {
        // Check if the file is empty
        if (file.isEmpty()) {
            throw new IOException("File is empty. Cannot store the profile picture.");
        }

        // Create a unique filename
        String originalFileName = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFileName);
        String uniqueFileName = userId + "_" + UUID.randomUUID() + fileExtension;

        // Define the target path
        Path targetPath = Paths.get(baseLocation, uniqueFileName);

        // Save the file
        Files.copy(file.getInputStream(), targetPath);

        // Update the user's profile picture path in the database
        PetOwner user = getUserByID(userId);
        if (user != null) {
            user.setPfpLocation(uniqueFileName);
            petOwnerRepo.save(user);
        }

        return uniqueFileName;
    }

    /**
     * Helper method to extract the file extension.
     *
     * @param fileName The original file name.
     * @return The file extension (e.g., ".jpg", ".png").
     */
    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf("."));
        }
        return ""; // Default to no extension if the file doesn't have one
    }
}
