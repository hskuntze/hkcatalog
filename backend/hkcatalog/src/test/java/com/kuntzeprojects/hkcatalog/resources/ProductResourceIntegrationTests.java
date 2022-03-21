 package com.kuntzeprojects.hkcatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuntzeprojects.hkcatalog.dto.ProductDTO;
import com.kuntzeprojects.hkcatalog.tests.Factory;
import com.kuntzeprojects.hkcatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objMapper;
	
	@Autowired
	private TokenUtil tk;
	
	private Long existingId;
	private Long nonExistingId;
	private Long totalProducts;
	private String username;
	private String password;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		totalProducts = 25L;
		username = "maria@gmail.com";
		password = "123456";
	}
	
	@Test
	public void findAllShouldReturnSortedPageWhenSortByName() throws Exception {
		mockMvc.perform(get("/products?page=0&size=10&sort=name,asc").accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.totalElements").value(totalProducts))
			.andExpect(jsonPath("$.content").exists())
			.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		ProductDTO productDto = Factory.createProductDTO();
		String jsonBody = objMapper.writeValueAsString(productDto);
		String expectedName = productDto.getName();
		
		mockMvc.perform(put("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.name").value(expectedName));
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenDoesntIdExist() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		ProductDTO productDto = Factory.createProductDTO();
		String jsonBody = objMapper.writeValueAsString(productDto);
		
		mockMvc.perform(put("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}
}
