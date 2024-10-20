package Model;

import jdk.jfr.DataAmount;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document

public class Users {
    @Id
    private String userPhone;

   private String userName;

   private String userEmail;

   private String userPassword;

    public Users(String userName, String userEmail, String userPhone, String userPassword) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userPassword = userPassword;
    }
}
