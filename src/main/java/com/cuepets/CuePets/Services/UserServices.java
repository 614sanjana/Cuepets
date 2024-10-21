package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.Users;
import com.cuepets.CuePets.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
    @Autowired
     private UserRepo userRepo;

    public void saveUser(Users user){
        userRepo.save(user);
    }

    public Iterable<Users> listAll() {
        return this.userRepo.findAll();
    }

    public void deleteUser(String phone) {
        userRepo.deleteById(phone);
    }

    public Users getUserByID(String phone) {
        return userRepo.findById(phone).get();
    }
}
