package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Repository.PetHealthRecordRepo;
import com.cuepets.CuePets.Services.PetHealthRecordServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

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

    /*
     Endpoint to delete the record
  */
//    @DeleteMapping(value = "/deleteRecord/{id}")
//    public ResponseEntity<String> deleteRecordByID(@PathVariable(name = "id") String recordId) {
//        try {
//            String result = petOwnerServices.deleteUserByID(id);
//            return ResponseEntity.ok(result);
//        } catch (NoSuchElementException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Failed to delete user and associated data. Error: " + e.getMessage());
//        }
//    }
}
