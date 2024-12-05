package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.BlogPosts;
import com.cuepets.CuePets.Model.Doctor;
import com.cuepets.CuePets.Repository.BlogPostsRepo;
import com.cuepets.CuePets.Services.BlogPostsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/blogs")

public class BlogPostsController {
    @Autowired
    private BlogPostsRepo blogPostsRepo;

    @Autowired
    private BlogPostsServices blogPostsServices;

    @PostMapping(value="/addBlogPosts")
    public BlogPosts addBlogPosts(@RequestBody BlogPosts blogPosts) {
        return blogPostsServices.saveBlogPosts(blogPosts);
    }

    @GetMapping(value="/getBlogPosts")
    public List<BlogPosts> getAllBlogPosts() {
        return blogPostsRepo.findAll();
    }
}
