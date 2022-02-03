package com.kuntzeprojects.hkcatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kuntzeprojects.hkcatalog.dto.RoleDTO;
import com.kuntzeprojects.hkcatalog.dto.UserDTO;
import com.kuntzeprojects.hkcatalog.dto.UserInsertDTO;
import com.kuntzeprojects.hkcatalog.dto.UserUpdateDTO;
import com.kuntzeprojects.hkcatalog.entities.Role;
import com.kuntzeprojects.hkcatalog.entities.User;
import com.kuntzeprojects.hkcatalog.repositories.RoleRepository;
import com.kuntzeprojects.hkcatalog.repositories.UserRepository;
import com.kuntzeprojects.hkcatalog.services.exceptions.DatabaseException;
import com.kuntzeprojects.hkcatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll(){
		List<User> list = repository.findAll();
		
		return list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable){
		Page<User> list = repository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entidade não foi encontrada."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO obj) {
		User entity = new User();
		dtoToEntity(obj, entity);
		entity.setPassword(encoder.encode(obj.getPassword()));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO obj) {
		try {
			User entity = repository.getOne(id);
			dtoToEntity(obj, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch(EntityNotFoundException e){
			throw new ResourceNotFoundException("ID "+id+" não foi encontrado)");
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(e.getMessage());
		} catch(DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}

	private void dtoToEntity(UserDTO obj, User entity) {
		entity.setFirstName(obj.getFirstName());
		entity.setLastName(obj.getLastName());
		entity.setEmail(obj.getEmail());
		
		entity.getRoles().clear();
		for(RoleDTO roleDto : obj.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);
		if(user == null) {
			logger.error("Usuário não foi encontrado " + username);
			throw new UsernameNotFoundException("Usuário não foi encontrado.");
		}
		logger.info(username + " foi encontrado.");
		return user;
	}
}
