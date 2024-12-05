package com.cuepets.CuePets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
public class
CuePetsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CuePetsApplication.class, args);
	}

}
