package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collation="appointments")
public class RegularAppointments {
    @Id
    private String appointmentId;

    private String appointmentDate;
    private String appointmentTime;
    private String reasonForAppointment;
    private String veterinarianName;
    private String clinicName;
}
