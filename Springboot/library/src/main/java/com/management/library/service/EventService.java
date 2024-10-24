package com.management.library.service;

import com.management.library.dto.OverDueEventDTO;
import com.management.library.dto.VisitorReturnBookDto;
import com.management.library.entity.Book;
import com.management.library.entity.Event;
import com.management.library.entity.User;
import com.management.library.exception.BadRequestServiceAlertException;
import com.management.library.repository.BookRepository;
import com.management.library.repository.EventRepository;
import com.management.library.repository.UserRepository;
import com.management.library.utils.Constants;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public BookRepository bookRepository;

    public final int max = 3;

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

    public List<Event> getPurchased(String id) {
        return this.eventRepository.findByUserIdAndIsReturnedFalse(id);
    }
//


    public List<VisitorReturnBookDto> getUserReturnBook() {
        List<Object[]> result = eventRepository.findUserWithEventCount();

        List<VisitorReturnBookDto> visitorReturnBookDtos=new ArrayList<>();
        for (Object[] obj : result) {
            User user = (User) obj[0];
            Long count = (Long) obj[1];
            visitorReturnBookDtos.add(VisitorReturnBookDto.builder()
                    .email(user.getEmail())
                    .name(user.getName())
                    .address(user.getAddress())
                    .createdAt(String.valueOf(user.getCreatedAt()))
                    .BookCount(count.toString())
                    .phoneNumber((user.getPhoneNumber()))
                    .build());

        }

        return visitorReturnBookDtos;
    }

    public List<OverDueEventDTO> getOverdueEvents() {
        List<Object[]> results = eventRepository.findOverdueEvents();


        return results.stream()
                .map(obj -> new OverDueEventDTO(
                        (String) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        ((Number) obj[3]).longValue(),
                        (String) obj[4]
                ))
                .collect(Collectors.toList());
    }
}