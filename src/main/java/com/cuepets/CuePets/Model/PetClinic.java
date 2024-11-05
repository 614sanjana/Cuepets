package com.cuepets.CuePets.Model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="clinic")
public class PetClinic {

    @Id
    private String clinicId;

    private String clinicName;
    private String doctorName;
    private String clinicLocation;
    private String doctorPhone;

}
