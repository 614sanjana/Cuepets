package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "pets")
public class Pets {
    @Id
    private String petID;

    private String OwnerID;
    private String petBreedID;
    private String petName;
    private String petAge;
    private String petGender;
    private boolean adoptionStatus=false;
    private List<String> petBehaviour;
    private List<String> petAllergies;
    private String PetProfile="";
}
