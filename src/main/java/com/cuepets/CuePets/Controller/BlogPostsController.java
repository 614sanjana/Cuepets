package com.cuepets.CuePets.Controller;

import com.cuepets.CuePets.Model.BlogPosts;
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

    @PostMapping(value="/addBlogPosts/{id}")
    public BlogPosts addBlogPosts(@RequestBody BlogPosts blogPosts,@PathVariable(name="id")String ownerId) {
        return blogPostsServices.saveBlogPosts(blogPosts,ownerId);
    }

    @GetMapping(value="/getBlogs/{id}")
    public List<BlogPosts> getUserBlogs(@PathVariable(name="id")String userId){
        return blogPostsRepo.findByownerId(userId);
    }

    @GetMapping(value="/getBlogPosts")
    public List<BlogPosts> getAllBlogPosts() {
        return blogPostsRepo.findAll();
    }

    @DeleteMapping(value="/deleteBlogPost/{blogID}")
    public String deleteBlogPost(@PathVariable(name="blogID") String blogID) {
        if (blogPostsRepo.existsById(blogID)) {
            blogPostsRepo.deleteById(blogID);
            return "Blog post with ID " + blogID + " has been successfully deleted.";
        } else {
            return "Blog post with ID " + blogID + " does not exist.";
        }
    }

}
