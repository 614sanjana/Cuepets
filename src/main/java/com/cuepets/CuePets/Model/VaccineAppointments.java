package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "vaccination")
public class VaccineAppointments {
    @Id
    private String appointmentId;

    private String ownerId;
    private String petId;
    private String clinicId;
    private String appointmentDate;
    private String appointmentTime;
}
