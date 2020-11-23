package com.gavin.io;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ObjectIoCreate {

	
	public static void main(String[] args) {
		try {
			ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.txt"));
			User user = new User();
			user.setId(1);
			user.setBank(5648674);
			user.setUsername("keke我是一名老师");
			oos.writeObject(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		try {
			//反序列化
			ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.txt"));
			User user = (User) ois.readObject();
			System.out.println(user.getId());
			System.out.println(user.getBank());
			System.out.println(user.getUsername());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
