package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="appointments")
public class Appointments {
    @Id
    private String appointmentId;

    private String ownerId;
    private String petId;
    private String clinicName;
    private String location;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentType;
    private String veterinarianName;
    private String description;
}
