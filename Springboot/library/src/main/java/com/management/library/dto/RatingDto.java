package com.management.library.dto;

import lombok.Data;

@Data
public class RatingDto {
    private Integer rating;
    private String userId;
    private String bookId;
}
