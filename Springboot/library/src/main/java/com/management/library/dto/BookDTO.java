package com.management.library.dto;

import lombok.Data;

@Data
public class BookDTO {
    private String name;
    private String isbn;
    private String authorName;
    private String publisher;
    private Long available;
    private String categoryId;
    private byte[] img;
}
