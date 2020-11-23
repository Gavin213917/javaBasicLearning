package com.gavin.io.NIO.demo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Test {

	public static void main(String[] args) {
		try (
				ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream("test.txt"));
		){
			Teacher teacher = new Teacher();
			Person person = new Person();
			person.setId(1);
			person.setUsername("可可");
			teacher.setPerson(person);
			teacher.setName("xiaoke");
//			outputStream.writeObject(person);
			outputStream.writeObject(teacher);
			teacher.setName("zhangsan");
			outputStream.writeObject(teacher);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		try (
				ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("test.txt"));
		){
			Teacher teacher = (Teacher) inputStream.readObject();
			Person person = teacher.getPerson();

			System.out.println(teacher.getName());
			System.out.println(teacher.getPerson().getId());
			System.out.println(teacher.getPerson().getUsername());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
