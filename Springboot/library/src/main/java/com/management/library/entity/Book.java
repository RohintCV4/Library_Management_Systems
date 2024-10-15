package com.management.library.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String isbn;

    private String authorName;

    private String publisher;

    private Long available;

    private Float rating;

    @Lob
    @Column(length = 500000)
    private byte[] imageData;

    @ManyToOne
    private Category category;
}
