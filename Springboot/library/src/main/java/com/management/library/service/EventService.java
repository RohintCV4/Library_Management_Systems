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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public BookRepository bookRepository;

    public final int max=3;

    public List<Event> borrowMultipleBooks(String visitorsId, Set<String> bookIds) {
        Optional<User> visitorOpt = userRepository.findById(visitorsId);
        if (!visitorOpt.isPresent()) {
            throw new IllegalArgumentException("Invalid Visitor ID");
        }

       

        User visitor = visitorOpt.get();
        List<Event> events = new ArrayList<>();

        for (String bookId : bookIds) {
            Optional<Book> bookOpt = bookRepository.findById(bookId);
            if (bookOpt.isPresent()) {
                Book book = bookOpt.get();

                // Check if the book is already borrowed by this visitor and not returned
                Optional<Event> existingEvent = eventRepository.findByBookIdAndUserIdAndIsReturnedFalse(bookId, visitorsId);
                if (existingEvent.isPresent()) {
                    throw new BadRequestServiceAlertException(400, "You have already borrowed this book and it has not been returned: " + book.getName());
                }

                // Check if the book is available for borrowing
                if (book.getAvailable() == null || book.getAvailable() <= 0) {
                    throw new BadRequestServiceAlertException(400, "Book is not available: " + book.getName());
                }

                // Create a new event for borrowing the book
                Event event = new Event();
                event.setUser(visitor);
                event.setBook(book);

                // Decrease the available count of the book
                if (book.getAvailable() > 0) {
                    book.setAvailable(book.getAvailable() - 1);
                }

                // Save the updated book state and event
                bookRepository.save(book);
                events.add(eventRepository.save(event));
            } else {
                throw new IllegalArgumentException("Invalid Book ID: " + bookId);
            }
        }
        return events;
    }


    public Event returnBook(String id) {
        final Event event = this.eventRepository.findById(id)
                .orElseThrow(() -> new BadRequestServiceAlertException(400, Constants.NOT_FOUND));

        if (event.getIsReturned() != null && event.getIsReturned()) {
            throw new BadRequestServiceAlertException(400, "Book has already been returned");
        }

        // Mark the event as returned
        event.setIsReturned(true);

        // Increase the available count of the book
        Book book = event.getBook();
        book.setAvailable(book.getAvailable() + 1);

        // Save the updated state of the book and event
        bookRepository.save(book);
        return this.eventRepository.save(event);
    }

    public List<Event> getPurchased(String id){
        return this.eventRepository.findByUserIdAndIsReturnedFalse(id);

    }
}