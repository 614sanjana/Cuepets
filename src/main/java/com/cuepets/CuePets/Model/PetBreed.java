package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection="breed")
public class PetBreed {
    @Id
    private String petBreedID;

    private String breedName;
    private List<String> petTypeID;
}
