package com.kuntzeprojects.hkcatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kuntzeprojects.hkcatalog.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

}
