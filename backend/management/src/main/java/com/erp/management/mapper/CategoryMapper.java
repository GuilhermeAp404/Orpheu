package com.erp.management.mapper;

import com.erp.management.DTOs.CategoryDTO;
import com.erp.management.domain.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category categoryDtoToCategory(CategoryDTO categoryDTO);
    CategoryDTO categoryToCategoryDto(Category category);

    Iterable<Category> categoryDtoListToCategoryList(Iterable<CategoryDTO> categoryDTOList);
    Iterable<CategoryDTO> categoryListToCategoryDtoList(Iterable<Category> categoryList);



}
