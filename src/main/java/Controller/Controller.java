package Controller;

import Model.Users;
import Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RequestMapping("api/v1/users")
@RestController

public class Controller {

    @Autowired
    UserServices userServices;

    @PostMapping("/addUser")
    public void addStudent(@RequestBody Users user) {
       userServices.addUser(user);
    }
}
