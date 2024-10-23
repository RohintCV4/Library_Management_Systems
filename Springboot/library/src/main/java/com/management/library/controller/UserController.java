package com.management.library.controller;

import com.management.library.dto.ResponseDTO;
import com.management.library.entity.User;
import com.management.library.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    public UserServiceImpl userService;

    @GetMapping("/get-data")
    public ResponseDTO getallVisitorUser() {
        return ResponseDTO.builder().data(this.userService.getallVisitorUser()).message("User Retrieved Successfully").statusCode(200).build();
    }



    @GetMapping("/account/{id}")
    public ResponseDTO getId(@PathVariable String id) throws AccountNotFoundException {
        System.out.print(this.userService.getId(id));
        return ResponseDTO.builder().data(this.userService.getId(id)).message("User Id Retrieved Successfully").statusCode(200).build();
    }

    @PutMapping("/update-user/{id}")
    public ResponseDTO updateUser(@PathVariable String id, @RequestBody User user) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.userService.updateUser(id, user)).message("Updated Successfully").statusCode(200).build();
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseDTO deleteUser(@PathVariable String id) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.userService.deleteUser(id)).message("Id deleted Successfully").statusCode(200).build();
    }

//    @GetMapping("/all/list/event")
//    public ResponseDTO getUserReturnBook(){
//        return ResponseDTO.builder().data(this.userService.getAllUserReturnBook()).message("UserList Retrieved Successfully").statusCode(200).build();
//    }
}