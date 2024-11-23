package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "healthRecord")
public class PetHealthRecord {
    private String recordID;
    private String petID;
    private String clinicID;
    private LocalDate recordDateAndTime;
    private List<String> reportImage;
}
