package com.cuepets.CuePets.Model;

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
}
