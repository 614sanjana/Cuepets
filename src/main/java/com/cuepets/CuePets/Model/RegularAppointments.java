package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="appointments")
public class RegularAppointments {
    @Id
    private String appointmentId;

    private String ownerId;
    private String petId;
    private String clinicName;
    private String location;
    private String appointmentDateTime;
    private String veterinarianName;
    private String description;
}
