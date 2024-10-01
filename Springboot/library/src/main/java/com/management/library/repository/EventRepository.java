package com.management.library.repository;

import com.management.library.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {


    @Query(value = "SELECT * FROM event WHERE book_id = ?1 AND user_id = ?2 AND is_returned = false", nativeQuery = true)
    Optional<Event> findByBookIdAndUserIdAndIsReturnedFalse(String bookId, String userId);
    List<Event> findByUserIdAndIsReturnedFalse(String userId);

}