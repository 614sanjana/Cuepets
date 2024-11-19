package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.DTO.SignIn;
import com.cuepets.CuePets.Model.PetOwner;
import com.cuepets.CuePets.Repository.PetOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AuthServices {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PetOwnerRepo petOwnerRepo;

    private static final int MIN = 00001;
    private static final int MAX = 99999;

    public String generateUniqueOwnerID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (petOwnerRepo.existsByOwnerID(generatedID));
        return generatedID;
    }

    public void saveUser(PetOwner user)
    {
        String hashedPass = bCryptPasswordEncoder.encode(user.getUserPassword());
        user.setUserPassword(hashedPass);
        user.setOwnerID(generateUniqueOwnerID());
        petOwnerRepo.save(user);
    }

    public boolean isUserExists(String userPhone){
        return petOwnerRepo.existsByuserPhone(userPhone);
    }

    public String signIn(SignIn signIn){
        String userPhoneNo = signIn.getUserPhone();
        String userPass = signIn.getUserPass();
        PetOwner user = petOwnerRepo.findByuserPhone(userPhoneNo);
        if(user!=null){
            String hashedPassword = user.getUserPassword();
            if(bCryptPasswordEncoder.matches(userPass,hashedPassword)){
                return "Login Successfully";
            }
            else
            {
                return "Incorrect password !!";
            }
        }
        else
        {
            return "No User Found !!";
        }
    }

}
