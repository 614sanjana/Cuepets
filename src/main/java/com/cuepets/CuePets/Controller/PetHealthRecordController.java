package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.PetHealthRecord;
import com.cuepets.CuePets.Services.PetHealthRecordServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/healthRecord")
public class PetHealthRecordController {

    @Autowired
    private PetHealthRecordServices petHealthRecordServices;

    private final String uploadDirectory = "";

    @PostMapping(value="/addRecord")
    public PetHealthRecord saveHealthRecord(@RequestBody PetHealthRecord healthRecord){
        return healthRecord;
    }




}
