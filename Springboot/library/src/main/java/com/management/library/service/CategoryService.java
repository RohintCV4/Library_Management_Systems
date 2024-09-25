package com.management.library.service;

import com.management.library.entity.Category;
import com.management.library.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;

import java.util.List;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    public CategoryRepository categoryRepository;

    public Category createCategory(final Category category){
        return this.categoryRepository.save(category);
    }

    public List<Category> getCategory(){
        return this.categoryRepository.findAll();
    }

    public Category updateCategory(String id, Category category) throws AccountNotFoundException{

        final Optional<Category> categories=categoryRepository.findById(id);
        if(categories.isEmpty()){
            throw new AccountNotFoundException("Id not found");
        }
        else{
            final Category categoryResponse = categories.get();
            if(category.getName()!=null){
                categoryResponse.setName(category.getName());
            }
           return this.categoryRepository.save(categoryResponse);

        }

    }

    public Category deleteCategory(String id) throws AccountNotFoundException{
        boolean exists=categoryRepository.existsById(id);

        if(exists){
             this.categoryRepository.deleteById(id);
        }
        else{
            throw new AccountNotFoundException("Id not found");
        }
        return null;
    }
}
