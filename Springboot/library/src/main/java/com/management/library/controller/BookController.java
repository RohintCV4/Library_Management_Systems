package com.management.library.controller;

import com.management.library.dto.BookDTO;
import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Book;
import com.management.library.entity.Category;
import com.management.library.repository.CategoryRepository;
import com.management.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.security.auth.login.AccountNotFoundException;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
public class BookController {
    @Autowired
    public BookService bookService;
    @Autowired
    public CategoryRepository categoryRepository;

    @PostMapping("/create-book")
    public ResponseDTO createBook(@RequestParam("name") String name,
                                  @RequestParam("isbn") String isbn,
                                  @RequestParam("author") String author,
                                  @RequestParam("image") MultipartFile image,
                                  @RequestParam("available") Long available,
                                  @RequestParam("publisher") String publisher,
                                  @RequestParam("rating") Float rating,
                                  @RequestParam("categoryId") String categoryId) throws IOException {
        Book book = new Book();
        book.setName(name);
        book.setIsbn(isbn);
        book.setAuthorName(author);
        book.setImageData(image.getBytes());
        book.setAvailable(available);
        book.setPublisher(publisher);
        book.setRating(rating);
        Book savedBook = bookService.createBook(book, categoryId);

        return ResponseDTO.builder()
                .data(savedBook)
                .message("Book created successfully")
                .statusCode(201)
                .build();
    }



    @GetMapping("/get-book")
    public ResponseDTO getBook(){
        return ResponseDTO.builder().data(this.bookService.getBook()).message("Retrieved Book").statusCode(200).build();
    }

    @GetMapping("/filter-book")
    public List<BookDTO> searchBooks(@RequestParam(required = false) String search,
                                     @RequestParam(required = false) Integer page,
                                     @RequestParam(required = false) Integer size,
                                     @RequestParam(required = false, defaultValue = "name") String sortField,
                                     @RequestParam(required = false, defaultValue = "asc") String sortDirection) {
        return bookService.searchBooks(search, page, size, sortField, sortDirection);
    }

    @PutMapping("/rating-update")
    public ResponseDTO ratingUpdate(@RequestParam("id") String id){
        return ResponseDTO.builder().data(this.bookService.ratingUpdate(id)).message("Rating Updated").statusCode(200).build();
    }

    @PutMapping("/update-book/{id}")
    public ResponseDTO updateBook(@PathVariable String id,@RequestBody Book book) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.bookService.updateBook(id, book)).message("Updated Successfully").statusCode(200).build();
    }

    @DeleteMapping("/delete-book/{id}")
    public ResponseDTO deleteBook(@PathVariable String id) throws AccountNotFoundException{
        return ResponseDTO.builder().data(this.bookService.deleteBook(id)).message("Deleted Successfully").statusCode(200).build();
    }
}
