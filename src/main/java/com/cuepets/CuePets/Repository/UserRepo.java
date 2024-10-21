package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<Users,String> {

}
