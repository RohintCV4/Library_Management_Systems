package com.management.library.service;

import com.management.library.dto.ResponseDTO;
import com.management.library.dto.VisitorReturnBookDto;
import com.management.library.entity.User;
import com.management.library.exception.BadRequestServiceAlertException;
import com.management.library.repository.EventRepository;
import com.management.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Override
    public UserDetails loadUserByUsername(String username) throws BadRequestServiceAlertException {
        return userRepository.findByEmail(username).orElseThrow(() -> new BadRequestServiceAlertException(401, "User Not Found !!!"));
    }

    public User createUser(User user) {
        return this.userRepository.save(user);
    }

    public List<User> getallVisitorUser() {
        return this.userRepository.findByRole("ROLE_VISITOR");
    }

    public Optional<User> getId(String id) throws AccountNotFoundException {
        boolean exists = this.userRepository.existsById(id);
        if (exists) {
            return this.userRepository.findById(id);
        } else {
            throw new AccountNotFoundException("Id not found");
        }
    }

//    public List<VisitorReturnBookDto> getAllUserReturnBook() {
//        List<User> users = userRepository.findAll();

//            return users.stream().filter(user -> user.getRole().contains("ROLE_VISITOR")).map(user -> {
//                VisitorReturnBookDto dto = new VisitorReturnBookDto();
//                dto.setName(user.getName());
//                dto.setEmail(user.getEmail());
//                dto.setPhoneNumber(user.getPhoneNumber());
//                dto.setCreatedAt(user.getCreatedAt().toString());
//                dto.setAddress(user.getAddress());
//
//
//                Integer bookCount = eventRepository.countNotReturnedBooksByUserId(user.getId());
////                Integer bookCount= eventService.getNotReturn(user.getId());
//                dto.setBookCount(bookCount != null ? String.valueOf(bookCount) : "0");
//
//
//                return dto;
//            }).collect(Collectors.toList());
//    return null;
//    }


    public User updateUser(String id, User user) throws AccountNotFoundException {
        System.err.println(user);

        return userRepository.findById(id)
                .map(existingUser -> {
                    if (user.getName() != null) existingUser.setName(user.getName());
                    if (user.getAddress() != null) existingUser.setAddress(user.getAddress());
                    if (user.getPhoneNumber() != null) existingUser.setPhoneNumber(user.getPhoneNumber());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new AccountNotFoundException("Id not found"));
    }

    public ResponseDTO deleteUser(String id) throws AccountNotFoundException {
        boolean exists = this.userRepository.existsById(id);
        if (exists) {
            this.userRepository.deleteById(id);
            return ResponseDTO.builder().message("Id Deleted Successfully").statusCode(200).build();
        } else {
            throw new AccountNotFoundException("Id not found");
        }
    }


}
