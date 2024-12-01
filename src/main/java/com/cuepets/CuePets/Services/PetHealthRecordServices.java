package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Controller.PetOwnerController;
import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Model.Pets;
import com.cuepets.CuePets.Repository.PetHealthRecordRepo;
import com.cuepets.CuePets.Repository.PetsRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PetHealthRecordServices {

    @Autowired
    private PetHealthRecordRepo petHealthRecordRepo;

    @Autowired
    private PetsRepo petsRepo;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    public ResponseEntity<String> addPetHealthRecord(String petId, MultipartFile file) {
        try {
            // Validate the file
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty. Cannot store the health record.");
            }

            // Find the pet by ID
            Pets pet = petsRepo.findByPetID(petId);
            if (pet == null)
            {
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
    private static final Logger logger = LoggerFactory.getLogger(PetHealthRecordServices.class);

    public ResponseEntity<Resource> viewHealthRecordImage(String recordID) {
        try {
            // Fetch the health record by ID
            PetHealthRecord healthRecord = (PetHealthRecord) petHealthRecordRepo.findByRecordID(recordID).orElse(null);

            // Log the fetched health record or null
            if (healthRecord == null) {
                logger.warn("Health record not found for recordID: {}", recordID);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            logger.info("Health record fetched successfully for recordID: {}, PetID: {}", recordID, healthRecord.getPetID());

            if (healthRecord.getReportImage() == null || healthRecord.getReportImage().isEmpty()) {
                logger.warn("No report images found for recordID: {}", recordID);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Assuming there's only one image for now
            String fileName = healthRecord.getReportImage().get(0);

            // Log the file name
            logger.info("Health record file name: {}", fileName);

            // Construct the file path based on the petID and ownerID
            String petID = healthRecord.getPetID();
            Pets pet = petsRepo.findByPetID(petID);
            if (pet == null) {
                logger.warn("Pet not found for PetID: {}", petID);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            String ownerID = pet.getOwnerID();
            String baseDirectory = "src/main/resources/AssetData/" + ownerID + "/Pets/" + petID + "/Health_Record";
            Path filePath = Paths.get(baseDirectory, fileName);

            // Load the file as a Resource
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                logger.warn("File not found or not readable for file: {}", fileName);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Log the success and return the file as a response
            logger.info("Returning the file as a resource: {}", fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            logger.error("Error fetching or processing the health record for recordID: {}", recordID, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
