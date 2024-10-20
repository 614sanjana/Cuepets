package Services;

import Model.Users;
import Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;


public class UserServices {
    @Autowired
private UserRepo userRepo;
    public void addUser(Users user){
        userRepo.save(user);
    }
}
