package com.cuepets.CuePets.Repository;

import com.cuepets.CuePets.Model.BlogPosts;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogPostsRepo extends MongoRepository<BlogPosts,String> {

}
