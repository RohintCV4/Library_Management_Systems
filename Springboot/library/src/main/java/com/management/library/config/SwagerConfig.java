package com.management.library.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwagerConfig {

    @Bean
    public OpenAPI awesomeAPI() {
        return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("Bearer Authentication")).components(new Components().addSecuritySchemes("Bearer Authentication", createAPIKeySchema())).info(new Info().title("Library Management Systems").description("Library Management Application").version("1.0"));
    }

    private SecurityScheme createAPIKeySchema() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP).bearerFormat("JWT").scheme("bearer");
    }
}
