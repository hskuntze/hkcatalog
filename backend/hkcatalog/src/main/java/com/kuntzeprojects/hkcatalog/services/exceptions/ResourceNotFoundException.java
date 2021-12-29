package com.kuntzeprojects.hkcatalog.services.exceptions;


/**
 * Extender uma classe de exceção com "Exception" obriga o aplicativo a tratar a exceção.
 * Para uma aplicação mais flexível, é recomendável utilizar o "RuntimeException" pois podemos tratá-la, ou não.
 * @author Kuntze
 */
public class ResourceNotFoundException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String msg) {
		super(msg);
	}
}
