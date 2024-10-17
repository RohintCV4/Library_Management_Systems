package com.management.library.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetailDto {

    @Nullable
    private int status;
    @Nullable
    private String message;
    @Nullable
    private Date stamp;
    @Nullable
    private String description;

}
