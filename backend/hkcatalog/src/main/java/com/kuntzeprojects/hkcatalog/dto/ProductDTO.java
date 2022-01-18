package com.kuntzeprojects.hkcatalog.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import com.kuntzeprojects.hkcatalog.entities.Category;
import com.kuntzeprojects.hkcatalog.entities.Product;

public class ProductDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@Size(max = 120, message = "Deve ter no máximo 120 caracteres")
	@NotBlank(message = "Campo obrigatório!")
	private String name;
	@Positive(message = "Valor deve ser positivo!")
	private Double price;
	@Size(max = 120, message = "Deve ter no máximo 120 caracteres")
	@NotBlank(message = "Campo obrigatório!")
	private String description;
	private String imgUrl;
	@PastOrPresent(message = "A data do produto não pode ser futura!")
	private Instant date;
	
	private List<CategoryDTO> categories = new ArrayList<>();
	
	public ProductDTO() {
	}

	public ProductDTO(Long id, String name, Double price, String description, String imgUrl, Instant date) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.imgUrl = imgUrl;
		this.date = date;
	}
	
	public ProductDTO(Product obj) {
		this.id = obj.getId();
		this.name = obj.getName();
		this.price = obj.getPrice();
		this.description = obj.getDescription();
		this.imgUrl = obj.getImgUrl();
		this.date = obj.getDate();
	}
	
	public ProductDTO(Product obj, Set<Category> categories) {
		this(obj);
		categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}
}
