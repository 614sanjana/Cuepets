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


}
