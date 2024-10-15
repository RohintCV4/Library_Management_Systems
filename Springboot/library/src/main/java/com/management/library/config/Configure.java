package com.management.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Configure implements WebMvcConfigurer {

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://192.168.29.104:3000/")
                .allowedMethods("GET", "POST", "PUT", "DELETE").allowedHeaders("*");
    }

//	@Bean
//	@Profile("local")
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/api/v1/**")
//						.allowedOrigins("http://localhost:3000/")
//						.allowedMethods("GET","POST","PUT","DELETE")
//						.allowedHeaders("*");
//			}
//		};
//	}

}
