package com.cuepets.CuePets.Controller;



import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Services.PetOwnerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/user")

public class Controller {

    @Autowired
    private PetOwnerServices petOwnerServices;

    @PostMapping(value="/addUsers")
    private void addUsers(@RequestBody PetOwner user) {
        petOwnerServices.saveUser(user);
    }

    @GetMapping(value="/getAll")
    private Iterable<PetOwner>getUsers(){
        return petOwnerServices.listAll();
    }

    @PutMapping(value="/edit/{id}")
    private PetOwner updateUsers(@RequestBody PetOwner user, @PathVariable(name="id") String _id){
        user.setUserPhone(_id);
        petOwnerServices.saveUser(user);
        return user;
    }

    @DeleteMapping(value="/deleteUsers/{id}")
    private void deleteUsers(@PathVariable("id") String _id){
        petOwnerServices.deleteUser(_id);
    }

    @RequestMapping(value="/user/{id}")
    private PetOwner getUsers(@PathVariable(name="id") String userID){
        return petOwnerServices.getUserByID(userID);
    }
}
