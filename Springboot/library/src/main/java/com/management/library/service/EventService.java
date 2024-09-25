package com.management.library.service;

import com.management.library.entity.Book;
import com.management.library.entity.Event;
import com.management.library.entity.User;
import com.management.library.exception.BadRequestServiceAlertException;
import com.management.library.repository.BookRepository;
import com.management.library.repository.EventRepository;
import com.management.library.repository.UserRepository;
import com.management.library.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public BookRepository bookRepository;

    public Event borrowBook(String visitorsId, String bookId) {
        Optional<User> visitorOpt = userRepository.findById(visitorsId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (visitorOpt.isPresent() && bookOpt.isPresent()) {
            User visitor = visitorOpt.get();
            Book book = bookOpt.get();

            if (book.getAvailable() == null || book.getAvailable() <= 0) {
                throw new BadRequestServiceAlertException(400, "Book is not available");
            }

            Event event = new Event();
            event.setUser(visitor);
            event.setBook(book);

            if (book.getAvailable() > 0) {
                book.setAvailable(book.getAvailable() - 1);
            }

            bookRepository.save(book);

            return eventRepository.save(event);
        } else {
            throw new IllegalArgumentException("Invalid Visitor ID or Book ID");
        }
    }

    public Event returnBook(String id) {
        final Event event = this.eventRepository.findById(id)
                .orElseThrow(() -> new BadRequestServiceAlertException(400, Constants.NOT_FOUND));

        if (event.getIsReturned() != null && event.getIsReturned()) {
            throw new BadRequestServiceAlertException(400, "Book has already been returned");
        }

        event.setIsReturned(true);

        Book book = event.getBook();
        book.setAvailable(book.getAvailable() + 1);

        bookRepository.save(book);

        return this.eventRepository.save(event);
    }



}
