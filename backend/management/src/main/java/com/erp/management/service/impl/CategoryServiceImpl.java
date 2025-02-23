package com.erp.management.service.impl;

import com.erp.management.domain.model.Category;
import com.erp.management.domain.repository.CategoryRepository;
import com.erp.management.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category, Long id) {
        Category categoryDb = categoryRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Essa categoria não existe"));

        if (!categoryDb.getCategoryName().equals(category.getCategoryName())){
            categoryDb.setCategoryName(category.getCategoryName());
        }

        return categoryRepository.save(categoryDb);
    }

    @Override
    public void delete(Long id) {
        Category categoryDb = categoryRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Essa categoria não existe"));

        categoryRepository.deleteById(id);
    }
}
