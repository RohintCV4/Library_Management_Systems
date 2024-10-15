package com.management.library.controller;

import com.management.library.dto.RatingDto;
import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Rating;
import com.management.library.service.RatingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/rating-book")
    public ResponseDTO RatingBook(@RequestBody final RatingDto ratingDto) {
        Rating savedRating = ratingService.RatingBook(ratingDto.getRating(), ratingDto.getUserId(), ratingDto.getBookId());
        return ResponseDTO.builder()
                .data(savedRating)
                .message("Ratings Saved Successfully")
                .statusCode(200)
                .build();
    }
}