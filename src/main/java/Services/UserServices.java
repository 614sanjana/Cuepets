package Services;

import Model.Users;
import Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;


public class UserServices {
    @Autowired
     UserRepo userRepo;

    public void addUser(Users user){
        userRepo.save(user);
    }
}
