package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetHealthRecordRepo;
import com.cuepets.CuePets.Repository.PetsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class PetHealthRecordServices {

    @Autowired
    private PetHealthRecordRepo petHealthRecordRepo;

    @Autowired
    private PetsRepo petsRepo;

    public ResponseEntity<String> addPetHealthRecord(String petId, MultipartFile file) {
        try {
            // Validate the file
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot store the health record.");
            }

            // Find the pet by ID
            Pets pet = petsRepo.findByPetID(petId);
            if (pet == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found with ID: " + petId);
            }

            // Generate the record name in the format petname_date
            String petName = pet.getPetName().replaceAll("\\s+", "_"); // Replace spaces with underscores for safety
            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String recordName = petName + "_" + currentDate;

            // Generate a unique file name
            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String uniqueFileName = recordName + fileExtension;

            // Define the storage directory
            String ownerID = pet.getOwnerID();
            String baseDirectory = "src/main/resources/AssetData/" + ownerID + "/Pets/"+petId+"/Health_Record";

            // Ensure the directory exists
            Path userFolderPath = Paths.get(baseDirectory);
            if (!Files.exists(userFolderPath)) {
                Files.createDirectories(userFolderPath);
            }

            // Define the target file path
            Path targetPath = Paths.get(userFolderPath.toString(), uniqueFileName);

            // Save the file to the directory
            Files.copy(file.getInputStream(), targetPath);

            // Create a new PetHealthRecord
            PetHealthRecord healthRecord = new PetHealthRecord();
            healthRecord.setRecordID(UUID.randomUUID().toString());
            healthRecord.setPetID(petId);
            healthRecord.setRecordDateAndTime(LocalDate.now());
            healthRecord.setReportImage(Collections.singletonList(uniqueFileName)); // Save file path or name

            // Save the health record to the database
            petHealthRecordRepo.save(healthRecord);

            return ResponseEntity.status(HttpStatus.OK).body("Health record added successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error storing the health record file: " + e.getMessage());
        }
    }

    public ResponseEntity<List<PetHealthRecord>> getAllHealthRecordsForPet(String petId) {
        try {
            // Find the pet by ID
            Pets pet = petsRepo.findByPetID(petId);
            if (pet == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Fetch all health records for this pet from the repository
            List<PetHealthRecord> healthRecords = petHealthRecordRepo.findByPetID(petId);

            // Sort the health records by recordDateAndTime in descending order (latest first)
            healthRecords.sort((record1, record2) -> record2.getRecordDateAndTime().compareTo(record1.getRecordDateAndTime()));

            // Return the sorted list of health records
            return ResponseEntity.ok(healthRecords);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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
