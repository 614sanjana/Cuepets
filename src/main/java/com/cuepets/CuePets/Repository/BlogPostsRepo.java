package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.BlogPosts;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BlogPostsRepo extends MongoRepository<BlogPosts,String> {

    List<BlogPosts> findByownerId(String userId);
}
