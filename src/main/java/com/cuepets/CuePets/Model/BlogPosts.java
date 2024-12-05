package com.cuepets.CuePets.Model;

import org.springframework.data.annotation.Id;

public class BlogPosts {
    @Id
    private String blogId;

    private String authorName;
    private String ownerId;
    
}
