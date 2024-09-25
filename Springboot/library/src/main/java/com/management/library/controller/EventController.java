package com.management.library.controller;

import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Event;
import com.management.library.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/event")
public class EventController {

    @Autowired
    public EventService eventService;

    @PostMapping("/borrow")
    public ResponseEntity<Event> borrowBook(@RequestParam String visitorsId, @RequestParam String bookId) {
        try {
            Event event = eventService.borrowBook(visitorsId, bookId);
            return new ResponseEntity<>(event, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to return a book
    @PostMapping("/return/{eventId}")
    public ResponseEntity<Event> returnBook(@PathVariable String eventId) {
        try {
            Event event = eventService.returnBook(eventId);
            return new ResponseEntity<>(event, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
