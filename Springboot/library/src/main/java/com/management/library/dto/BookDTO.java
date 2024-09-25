package com.management.library.dto;

import lombok.Data;

@Data
public class BookDTO {
    private String name;
    private String authorName;
    private String publisher;
    private Long price;
    private String categoryName;
}
