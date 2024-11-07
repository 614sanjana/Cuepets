package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="type")
public class PetType {
    @Id
    private String petTypeId;

    private String petType;
}
