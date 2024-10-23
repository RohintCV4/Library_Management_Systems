package com.management.library.repository;

import com.management.library.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {


    @Query(value = "SELECT * FROM event WHERE book_id = ?1 AND user_id = ?2 AND is_returned = false", nativeQuery = true)
    Optional<Event> findByBookIdAndUserIdAndIsReturnedFalse(String bookId, String userId);

    List<Event> findByUserIdAndIsReturnedFalse(String userId);


//    @Query(value = "SELECT COUNT(*) FROM event WHERE user_id = ?1 AND is_returned = false", nativeQuery = true)
//    Integer countNotReturnedBooksByUserId(String userId);

//    Collection<Object> findByIdIsReturnedIsFalse(String id);

//    List<Event> findByIdIsReturnedFalse(String id);

//    List<Event> findAllByIdAndIsReturnedIsFalse(String id);

//    List<Event> findByIsReturned(String number);

    @Query("SELECT e.user as user, COUNT(e) as count " +
            "FROM Event e " +
            "WHERE e.user.role = 'ROLE_VISITOR' AND e.isReturned = false " +
            "GROUP BY e.user")
    List<Object[]> findUserWithEventCount();
}