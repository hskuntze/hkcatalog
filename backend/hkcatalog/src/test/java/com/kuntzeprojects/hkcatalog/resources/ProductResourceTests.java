package com.kuntzeprojects.hkcatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kuntzeprojects.hkcatalog.dto.ProductDTO;
import com.kuntzeprojects.hkcatalog.services.ProductService;
import com.kuntzeprojects.hkcatalog.services.exceptions.DatabaseException;
import com.kuntzeprojects.hkcatalog.services.exceptions.ResourceNotFoundException;
import com.kuntzeprojects.hkcatalog.tests.Factory;
import com.kuntzeprojects.hkcatalog.tests.TokenUtil;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper objMapper;
	
	@Autowired
	private TokenUtil tk;

	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private ProductDTO productDto;
	private PageImpl<ProductDTO> page;
	private String username;
	private String password;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 3L;
		productDto = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDto));
		username = "maria@gmail.com";
		password = "123456";
		
		Mockito.when(service.findAllPaged(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(service.findById(existingId)).thenReturn(productDto);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.update(ArgumentMatchers.eq(existingId), ArgumentMatchers.any())).thenReturn(productDto);
		Mockito.when(service.update(ArgumentMatchers.eq(nonExistingId), ArgumentMatchers.any())).thenThrow(ResourceNotFoundException.class);
		
		Mockito.doNothing().when(service).delete(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		Mockito.doThrow(DatabaseException.class).when(service).delete(dependentId);
		
		Mockito.when(service.insert(ArgumentMatchers.any())).thenReturn(productDto);
	}
	
	/**
	 * 					A sintaxe do MockMvc é: chamada do método HTTP desejado [.perform('method')], 
	 *  com a possibilidade de encadear uma assertion [.andDo(ResultHandler); .andExpect(ResultMatcher); .andReturn()]
	 * @throws Exception
	 */
	@Test
	public void findAllShouldReturnPage() throws Exception {
		mockMvc.perform(get("/products").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		//.accept() se trata da negociação de MediaType; 
		//neste caso, estamos dizendo que esta requisição vai aceitar como resposta o tipo JSON
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception {
		mockMvc.perform(get("/products/{id}", existingId).accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").exists()); //jsonPath() consegue acessar o corpo da resposta; "$.{campo}"
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		mockMvc.perform(get("/products/{id}", nonExistingId).accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}
	
	/**
	 * O método de update na camada Web exige um corpo na requisição, onde passamos o objeto como deve ser atualizado.
	 * 	O corpo da requisição HTTP é um objeto JSON, e não Java, então devemos converte-lo. Para tal, utilizaremos o 
	 * 		ObjectMapper, que possui métodos preparados para esta conversão. Para inserir este body na requisição
	 * 				basta que encadeemos, com o método HTTP, o .content() e o seu tipo .contentType()
	 * @throws Exception
	 */
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objMapper.writeValueAsString(productDto);
		
		mockMvc.perform(put("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.name").exists());
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objMapper.writeValueAsString(productDto);
				
		mockMvc.perform(put("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isNotFound());
	}
	
	@Test
	public void deleteShouldReturnNoContentWhenIdExists() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken));
		
		result.andExpect(status().isNoContent());
	}
	
	@Test
	public void deleteShouldReturnNotFoundWhenIdDoesNotExists() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		ResultActions result = mockMvc.perform(delete("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void insertShouldReturnCreatedAndProductDTO() throws Exception {
		String accessToken = tk.obtainAccessToken(mockMvc, username, password);
		
		String jsonBody = objMapper.writeValueAsString(productDto);
		
		mockMvc.perform(post("/products")
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated());
	}
}
