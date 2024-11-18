package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "doctor")
public class Doctor {
    @Id
    private String doctorID;

    private String docName;
    private String experience;
    private String phoneNumber;
    private String email;

}


