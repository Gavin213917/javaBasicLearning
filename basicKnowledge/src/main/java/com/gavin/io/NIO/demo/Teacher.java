package com.gavin.io.NIO.demo;

public class Teacher implements java.io.Serializable{

	private String name;
	private Person person;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Person getPerson() {
		return person;
	}
	public void setPerson(Person person) {
		this.person = person;
	}
	
	
}
