package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "adoption")
public class PetAdoption {
    @Id
    private String adoptionID;

    private String petID;
    private String ownerID;
    private String AdoptionDate= "Null";
    private String adopterID= "None";
    private Boolean adoptionStatus= false;
}
