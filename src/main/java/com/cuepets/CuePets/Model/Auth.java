package com.cuepets.CuePets.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Auth {
    private String userPhone;

    private String userPassword;
}
