package com.management.library.repository;

import com.management.library.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, String> {

    List<Rating> findByBook_Id(String id);

    Rating findByBook_IdAndUser_Id(String bookId, String userId);


}