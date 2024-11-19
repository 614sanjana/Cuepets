package com.cuepets.CuePets.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="clinic")
public class PetClinic {

    @Id
    private String clinicID;

    private String clinicName;
    private String doctorID;
    private String clinicLocation;
    private String clinicNumber;
    private Boolean isOpen;
}
