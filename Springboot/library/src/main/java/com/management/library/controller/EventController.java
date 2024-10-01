package com.management.library.controller;

import com.management.library.dto.BorrowBooksRequestDTO;
import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Event;
import com.management.library.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/event")
public class EventController {

    @Autowired
    public EventService eventService;

    @PostMapping("/borrow/multiple/{visitorsId}")
    public ResponseDTO borrowMultipleBooks(@PathVariable String visitorsId, @RequestBody BorrowBooksRequestDTO request) {
        // Validate the number of books requested
        if (request.getBookId().size() < 1 || request.getBookId().size() > 3) {
            return ResponseDTO.builder()
                    .message("You must borrow between 1 and 3 books.")
                    .statusCode(400) // HTTP BAD REQUEST
                    .build();
        }

        List<Event> events = eventService.borrowMultipleBooks(visitorsId, request.getBookId());
        return ResponseDTO.builder()
                .data(events)
                .message("Books borrowed successfully.")
                .statusCode(200) // HTTP OK
                .build();
    }



    // Endpoint to return a book
    @PostMapping("/return/{eventId}")
    public ResponseDTO returnBook(@PathVariable String eventId) {
        try {
            Event event = eventService.returnBook(eventId);
            return ResponseDTO.builder()
                    .data(event)
                    .message("Book returned successfully.")
                    .statusCode(200)
                    .build();
        } catch (IllegalArgumentException e) {
            return ResponseDTO.builder()
                    .message("Invalid input: " + e.getMessage())
                    .statusCode(400)
                    .build();
        } catch (Exception e) {
            return ResponseDTO.builder()
                    .message("An error occurred: " + e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
    @GetMapping("/borrowed/{id}")
    public ResponseDTO getBorrowedBooks(@PathVariable String id) {
        List<Event> events = eventService.getPurchased(id);
        return ResponseDTO.builder()
                .data(events)
                .message("Fetched borrowed books successfully.")
                .statusCode(200)
                .build();
    }
}