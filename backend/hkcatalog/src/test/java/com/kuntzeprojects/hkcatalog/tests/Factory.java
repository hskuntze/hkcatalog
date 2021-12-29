package com.kuntzeprojects.hkcatalog.tests;

import java.time.Instant;

import com.kuntzeprojects.hkcatalog.dto.ProductDTO;
import com.kuntzeprojects.hkcatalog.entities.Category;
import com.kuntzeprojects.hkcatalog.entities.Product;

public class Factory {
	
	public static Product createProduct() {
		Product product = new Product(1L, "iPhone 13", 14599.99, "New iPhone", "https://img.com/img.png", Instant.parse("2021-12-21T01:12:41Z")); 
		product.getCategories().add(createCategory());
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product p = createProduct();
		return new ProductDTO(p, p.getCategories());
	}
	
	public static Category createCategory() {
		return new Category(1L, "Category X");
	}
}
