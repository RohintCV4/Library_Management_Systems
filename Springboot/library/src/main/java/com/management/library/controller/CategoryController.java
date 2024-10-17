package com.management.library.controller;

import com.management.library.dto.ResponseDTO;
import com.management.library.entity.Category;
import com.management.library.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;

@RestController
@RequestMapping("/api/v1/auth")
public class CategoryController {
    @Autowired
    public CategoryService categoryService;

    @PostMapping("/create-category")
    public ResponseDTO createCategory(@RequestBody Category category) {
        return ResponseDTO.builder().data(this.categoryService.createCategory(category)).message("Data Created").statusCode(201).build();
    }

    @GetMapping("/get-category")
    public ResponseDTO getCategory() {
        return ResponseDTO.builder().data(this.categoryService.getCategory()).message("Retrieved Data").statusCode(200).build();
    }

    @PutMapping("/update-category/{id}")
    public ResponseDTO updateCategory(@PathVariable String id, @RequestBody Category category) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.categoryService.updateCategory(id, category)).message("Data Updated").statusCode(200).build();
    }

    @DeleteMapping("/delete-category/{id}")
    public ResponseDTO deleteCategory(@PathVariable String id) throws AccountNotFoundException {
        return ResponseDTO.builder().data(this.categoryService.deleteCategory(id)).message("Data Deleted").statusCode(200).build();
    }
}
