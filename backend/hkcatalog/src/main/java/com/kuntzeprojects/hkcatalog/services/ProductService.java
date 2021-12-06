package com.kuntzeprojects.hkcatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kuntzeprojects.hkcatalog.dto.CategoryDTO;
import com.kuntzeprojects.hkcatalog.dto.ProductDTO;
import com.kuntzeprojects.hkcatalog.entities.Category;
import com.kuntzeprojects.hkcatalog.entities.Product;
import com.kuntzeprojects.hkcatalog.repositories.CategoryRepository;
import com.kuntzeprojects.hkcatalog.repositories.ProductRepository;
import com.kuntzeprojects.hkcatalog.services.exceptions.DatabaseException;
import com.kuntzeprojects.hkcatalog.services.exceptions.EntityNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository catRepository;
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll(){
		List<Product> list = repository.findAll();
		
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest){
		Page<Product> list = repository.findAll(pageRequest);
		return list.map(x -> new ProductDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new EntityNotFoundException("Entidade não foi encontrada."));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO obj) {
		Product entity = new Product();
		dtoToEntity(obj, entity);
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO obj) {
		try {
			Product entity = repository.getOne(id);
			dtoToEntity(obj, entity);
			entity = repository.save(entity);
			return new ProductDTO(entity);
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

	private void dtoToEntity(ProductDTO obj, Product entity) {
		entity.setName(obj.getName());
		entity.setPrice(obj.getPrice());
		entity.setDescription(obj.getDescription());
		entity.setDate(obj.getDate());
		entity.setImgUrl(obj.getImgUrl());
		
		entity.getCategories().clear();
		for(CategoryDTO catDto : obj.getCategories()) {
			Category category = catRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}
	}
}
