package com.cuepets.CuePets.Controller;



import com.cuepets.CuePets.Model.Users;
import com.cuepets.CuePets.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/user")

public class Controller {

    @Autowired
    private UserServices userServices;

    @PostMapping(value="/addUsers")
    private void addUsers(@RequestBody Users user) {
        userServices.saveUser(user);
    }

    @GetMapping(value="/getAll")
    private Iterable<Users>getUsers(){
        return userServices.listAll();
    }

    @PutMapping(value="/edit/{id}")
    private Users updateUsers(@RequestBody Users user,@PathVariable(name="id") String _id){
        user.setUserPhone(_id);
        userServices.saveUser(user);
        return user;
    }

    @DeleteMapping(value="/deleteUsers/{id}")
    private void deleteUsers(@PathVariable("id") String _id){
        userServices.deleteUser(_id);
    }

    @RequestMapping(value="/user/{id}")
    private Users getUsers(@PathVariable(name="id") String userID){
        return userServices.getUserByID(userID);
    }
}
