package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class PetOwner {
    @Id
    private String userPhone;
    private String ownerID;  //initally we thought transient annotation would be used but then an error occured because a data anotted by @Transient means we cant store it in DB
                            //so therfore we removed the annotation since we wanted the ownerID to be stored in the DB
    private String userName;
    private String userEmail;
    private String pfpLocation="";
    private String userPassword;
}
