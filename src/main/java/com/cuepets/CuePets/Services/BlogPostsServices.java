package com.cuepets.CuePets.Services;

import com.cuepets.CuePets.Model.BlogPosts;
import com.cuepets.CuePets.Repository.BlogPostsRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

public class BlogPostsServices {
    @Autowired
    private BlogPostsRepo blogPostsRepo;

    private static final int MIN = 1;
    private static final int MAX = 99999;

    public String generateUniqueBlogPostID()
    {
        Random random = new Random();
        String generatedID;
        do
        {
            generatedID = String.valueOf(random.nextInt((MAX - MIN) + 1) + MIN);
        } while (blogPostsRepo.existsByBlogPostId(generatedID));
        return generatedID;
    }

     public BlogPosts saveBlogPosts(BlogPosts blogPosts) {
        blogPosts.setBlogPostId(generateUniqueBlogPostID());
        blogPostsRepo.save(blogPosts);
        return blogPosts;
    }

    public BlogPosts getBlogPostsByID(String id) {
        return blogPostsRepo.findById(id).get();
    }
}
