package com.management.library.service;

import com.management.library.dto.BookDTO;
import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Book;
import com.management.library.entity.Category;
import com.management.library.repository.BookRepository;
import com.management.library.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.security.auth.login.AccountNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    @Autowired
    public BookRepository bookRepository;

    @Autowired
    public CategoryRepository categoryRepository;

    public Book createBook(Book book, String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
        book.setCategory(category); // Set category in book
        return bookRepository.save(book);
    }

    public List<Book> getBook() {
        return this.bookRepository.findAllAvailableBook();
    }


    public List<BookDTO> searchBooks(String search, Integer page, Integer size, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 6, sort);


        Page<Book> bookPage = bookRepository.searchBooks(search, pageable);
        List<BookDTO> BookDTOs = new ArrayList<>();
        for (Book book : bookPage) {
            BookDTO dto = new BookDTO();
            dto.setPublisher(book.getPublisher());
            dto.setName(book.getName());
            dto.setAuthorName(book.getAuthorName());


            BookDTOs.add(dto);
        }
        return BookDTOs;
    }

    public Book updateBook(String id, Book book) throws AccountNotFoundException {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    if (book.getName() != null) existingBook.setName(book.getName());
                    if (book.getCategory() != null) existingBook.setCategory(book.getCategory());
                    if (book.getIsbn() != null) existingBook.setIsbn(book.getIsbn());
                    if (book.getAvailable() != null) existingBook.setAvailable(book.getAvailable());
                    if (book.getAuthorName() != null) existingBook.setAuthorName(book.getAuthorName());
                    if (book.getPublisher() != null) existingBook.setPublisher(book.getPublisher());
                    return bookRepository.save(existingBook);
                })
                .orElseThrow(() -> new AccountNotFoundException("Id not found"));
    }


    public ResponseDTO deleteBook(String id) throws AccountNotFoundException {
        boolean exists = bookRepository.existsById(id);
        if (exists) {
            bookRepository.deleteById(id);
            return ResponseDTO.builder().message("Book deleted successfully").statusCode(200).build();
        } else {
            throw new AccountNotFoundException("Id not found");
        }
    }
}