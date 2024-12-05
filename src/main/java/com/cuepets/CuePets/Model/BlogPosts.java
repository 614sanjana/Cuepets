package com.cuepets.CuePets.Model;

<<<<<<< HEAD
import org.springframework.data.annotation.Id;

public class BlogPosts {
    @Id
    private String blogId;

    private String authorName;
    private String ownerId;
    
=======
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="blogs")
@Data
public class BlogPosts {

    @Id
    private String blogId;

    private String blogTitle;
    private String blogDesc;
    private String blogContent;
>>>>>>> da73c111566697e05defba21ed64ec49fe5d71b4
}
