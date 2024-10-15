package com.management.library.service;

import com.management.library.entity.Book;
import com.management.library.entity.Rating;
import com.management.library.entity.User;
import com.management.library.repository.BookRepository;
import com.management.library.repository.RatingRepository;
import com.management.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookService bookService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, BookRepository bookRepository, UserRepository userRepository, BookService bookService) {
        this.ratingRepository = ratingRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.bookService = bookService;
    }

    public Rating RatingBook(Integer ratingValue, String userId, String bookId) {
//        System.err.print(bookId);
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book Id not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Id not found"));
        Rating ratings=this.ratingRepository.findByBook_IdAndUser_Id(bookId,userId);

        // Create a new Rating instance
        if(ratings==null) {
            Rating rate = Rating.builder()
                    .rating(ratingValue)
                    .book(book)
                    .user(user)
                    .build();
            Rating rating=ratingRepository.save(rate);
            bookService.ratingUpdate(book.getId());
            return rating;
        }
//        Rating updateValue=ratingRepository.findByRating(id);
        if(ratings!=null){
            ratings.setRating(ratingValue);
            ratingRepository.save(ratings);
            bookService.ratingUpdate(book.getId());
            return ratings;
        }

//        bookService.ratingUpdate(book.getId());
        return null;
    }
}