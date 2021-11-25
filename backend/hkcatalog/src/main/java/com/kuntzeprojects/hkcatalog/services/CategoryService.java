package com.kuntzeprojects.hkcatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kuntzeprojects.hkcatalog.dto.CategoryDTO;
import com.kuntzeprojects.hkcatalog.entities.Category;
import com.kuntzeprojects.hkcatalog.repositories.CategoryRepository;
import com.kuntzeprojects.hkcatalog.services.exceptions.EntityNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		List<Category> list = repository.findAll();
		
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new EntityNotFoundException("Entidade não foi encontrada."));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO obj) {
		Category entity = new Category();
		entity.setName(obj.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}
	
}
