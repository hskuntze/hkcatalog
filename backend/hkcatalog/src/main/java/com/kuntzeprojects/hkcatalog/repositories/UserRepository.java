package com.kuntzeprojects.hkcatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kuntzeprojects.hkcatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
