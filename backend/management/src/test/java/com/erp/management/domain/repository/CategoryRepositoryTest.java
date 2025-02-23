package com.erp.management.domain.repository;

import com.erp.management.domain.model.Category;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@ActiveProfiles("test")
class CategoryRepositoryTest {
    @Autowired
    CategoryRepository categoryRepository;

    @Test
    @DisplayName("Criar e Retornar categoria")
    void findCategory(){
        Category created = this.createCategory("shoes");
        var result = categoryRepository.findById(created.getId())
                .orElseThrow(()-> new NoSuchElementException("nada encontrado"));

        assertEquals(created.getCategoryName(), result.getCategoryName());
    }

    @Test
    @DisplayName("Buscar lista da categorias")
    void findAllCategories(){
        this.createCategory("pants");
        this.createCategory("shoes");


        List<Category> categorieList = (List<Category>) categoryRepository.findAll();

        assertFalse(categorieList.isEmpty());
        assertEquals(2, categorieList.size());
    }

    @Test
    @DisplayName("Atualizar categorias")
    void updateCategories(){
        Category create = this.createCategory("pants");

        create.setCategoryName("shoes");
        categoryRepository.save(create);

        Category db = categoryRepository.findById(create.getId()).orElseThrow(()-> new NoSuchElementException("nada encontrado"));

        assertEquals(create.getCategoryName(), db.getCategoryName());
    }

    @Test
    @DisplayName("Deletar categorias")
    void deleteCategories(){
        Category create = this.createCategory("pants");

        categoryRepository.deleteById(create.getId());

        assertThrows(NoSuchElementException.class, ()->{
            categoryRepository.findById(create.getId()).orElseThrow(()-> new NoSuchElementException("nada encontrado"));
        });
    }


    private Category createCategory(String categoryName){
        Category category = Category.builder().categoryName(categoryName).build();
        return categoryRepository.save(category);
    }
}