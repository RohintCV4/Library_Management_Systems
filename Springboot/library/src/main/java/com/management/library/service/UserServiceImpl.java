package com.management.library.service;

import com.management.library.dto.ResponseDTO;
import com.management.library.dto.SignUpRequest;
import com.management.library.entity.User;
import com.management.library.exception.BadRequestServiceAlertException;
import com.management.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws BadRequestServiceAlertException {
        return userRepository.findByEmail(username).orElseThrow(() -> new BadRequestServiceAlertException(401,"User Not Found !!!"));
    }

    public User createUser(User user){
        return this.userRepository.save(user);
    }

    public List<User> getUser(){
        return this.userRepository.findAll();
    }

    public Optional<User> getId(@PathVariable String id) throws AccountNotFoundException {
        boolean exists=this.userRepository.existsById(id);
        if(exists){
            return this.userRepository.findById(id);
        }
        else{
            throw new AccountNotFoundException("Id not found");
        }
    }



    public User updateUser(@PathVariable String id, @RequestBody User user) throws AccountNotFoundException{
        System.err.println(user);

        return userRepository.findById(id)
                .map(existingUser -> {
                    if(user.getName()!= null) existingUser.setName(user.getName());
                    if(user.getAddress()!=null) existingUser.setAddress(user.getAddress());
                    if(user.getPhoneNumber()!=null) existingUser.setPhoneNumber(user.getPhoneNumber());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new AccountNotFoundException("Id not found"));
    }

    public ResponseDTO deleteUser(String id) throws AccountNotFoundException{
        boolean exists=this.userRepository.existsById(id);
        if(exists){
            this.userRepository.deleteById(id);
            return ResponseDTO.builder().message("Id Deleted Successfully").statusCode(200).build();
        }
        else{
            throw new AccountNotFoundException("Id not found");
        }
    }


}
