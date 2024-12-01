package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Repository.PetHealthRecordRepo;
import com.cuepets.CuePets.Services.PetHealthRecordServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/healthrecord")
@CrossOrigin(origins = "*")
public class PetHealthRecordController {
    @Autowired
    private PetHealthRecordServices petHealthRecordServices;

    private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger(PetOwnerController.class);

    @PostMapping(value = "/addRecord/{id}")
    public ResponseEntity<String> addHealthRecord(
            @PathVariable(name = "id") String id,
            @RequestParam("file") MultipartFile file) {
        try {
            // Call the service to store the profile picture
            return petHealthRecordServices.addPetHealthRecord(id, file); // Return the response from the service
        } catch (Exception e) {
            // Log the error and return an appropriate response
            LOGGER.error("Error uploading profile picture for user ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Failed to upload profile picture. Error: " + e.getMessage());
        }
    };

    @GetMapping("/getRecords/{petId}")
    public ResponseEntity<List<PetHealthRecord>> getHealthRecords(@PathVariable(name = "petId") String petId)
    {
        return petHealthRecordServices.getAllHealthRecordsForPet(petId);
    }

    @GetMapping("/viewImage/{recordID}")
    public ResponseEntity<Resource> viewHealthRecordImage(@PathVariable String recordID) {
        return petHealthRecordServices.viewHealthRecordImage(recordID);
    }
}
