package com.kuntzeprojects.hkcatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kuntzeprojects.hkcatalog.dto.CategoryDTO;
import com.kuntzeprojects.hkcatalog.entities.Category;
import com.kuntzeprojects.hkcatalog.repositories.CategoryRepository;
import com.kuntzeprojects.hkcatalog.services.exceptions.DatabaseException;
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

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO obj) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(obj.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
		} catch(javax.persistence.EntityNotFoundException e){
			throw new EntityNotFoundException("ID "+id+" não foi encontrado)");
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch(EmptyResultDataAccessException e) {
			throw new EntityNotFoundException(e.getMessage());
		} catch(DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}
	
}
