package com.management.library.repository;

import com.management.library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,String> {
//    List<Book> findByCategoryId(Long CategoryId);
//    boolean existsByEmail(String email);

    @Query("SELECT b FROM Book b LEFT JOIN b.category c WHERE " +
            "(:search IS NULL OR b.name LIKE %:search%) OR " +
            "(:search IS NULL OR b.isbn LIKE %:search%) OR " +
            "(:search IS NULL OR b.authorName LIKE %:search%) OR " +
            "(:search IS NULL OR b.publisher LIKE %:search%) OR " +
            "(:search IS NULL OR c.id LIKE %:search%) OR " +
            "(:search IS NULL OR c.name LIKE %:search%)")
    Page<Book> searchBooks(@Param("search") String search, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.available >= 1")
    List<Book> findAllAvailableBook();
}
