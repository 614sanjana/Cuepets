package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetType;
import com.cuepets.CuePets.Repository.PetTypeRepo;
import com.cuepets.CuePets.Services.PetTypeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/type")

public class PetTypeController {
    @Autowired
    private PetTypeServices petTypeServices;

    @Autowired
    private PetTypeRepo petTypeRepo;

    @PostMapping(value="/addType")
    private void addType(@RequestBody PetType type){
        petTypeServices.saveType(type);
    }

    @GetMapping(value="/getType")
    public List<PetType> getAllType(){
        return petTypeRepo.findAll();
    }

    @GetMapping(value = "/getType/{id}")
    public PetType getById(@PathVariable(name="id")String id){
        return petTypeServices.getTypeById(id);
    }

    //@DeleteMapping(value="/deleteType/{id}")
    //public void deleteType(@PathVariable (name="id")String id){
     //  petTypeServices.deleteType(id);


}
