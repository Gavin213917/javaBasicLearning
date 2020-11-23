package com.gavin.enumJava;

public class GenderTest {
	
	public static void main(String[] args) {
//		Gender gender = Gender.valueOf("MALE");
//		gender.name = "Ů";
//		System.out.println(gender.name);
		
		
		
		
//		Gender2 gender2 = Gender2.valueOf("FEMALE");
//		gender2.setName("Ů");
//		System.out.println(gender2.getName());
		
		
		Gender3 gender3 = Gender3.valueOf("OTHER");
		System.out.println(gender3.getName());
		gender3.message();
		
		
		
//		DBEnum gender3 = DBEnum.valueOf("MYSQL");
//		DBEnum gender3 = DBEnum.valueOf("ORACLE");
//		System.out.println(gender3.getDriver());
//		System.out.println(gender3.getUrl());
//		System.out.println(gender3.getUsername());
//		System.out.println(gender3.getPassword());
		
		
		
	}
}
