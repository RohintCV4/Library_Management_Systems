package com.management.library.controller;

import com.management.library.dto.BookDTO;
import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Book;
import com.management.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
public class BookController {
    @Autowired
    public BookService bookService;

    @PostMapping("/create-book")
    public ResponseDTO createBook(@RequestBody Book book){
        return ResponseDTO.builder().data(this.bookService.createBook(book)).message("Book created successfully").statusCode(201).build();
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

    @PutMapping("/update-book/{id}")
    public ResponseDTO updateBook(@PathVariable String id,@RequestBody Book book) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.bookService.updateBook(id, book)).message("Updated Successfully").statusCode(200).build();
    }

    @DeleteMapping("/delete-book/{id}")
    public ResponseDTO deleteBook(@PathVariable String id) throws AccountNotFoundException{
        return ResponseDTO.builder().data(this.bookService.deleteBook(id)).message("Deleted Successfully").statusCode(200).build();
    }
}
