package com.gavin.object;

import java.io.File;

public class Student4 {
	
	private  String name;
	private int age;
	private Float money;

	/*
	 * 重载是针对方法--针对当前类本身
	 * 方法名一致，参数列表的数据类型不一致就是重载。（同名不同参）
	 * 与修饰符无关
	 * 与返回值无关
	 * 
	 * 好处：提高代码的复用性
	 * 
	 * 
	 * 
	 */
	public static String readFile(File file) {
		return "";
	}
	
	public static String readFile(String pathname) {
		File file = new File(pathname);
		
		return Student4.readFile(file);
	}
	
	
	
	
	
	public static void main(String[] args) {
		Student4 student2 = new Student4();
//		student2.readFile("d://a.txt");
//		student2.readFile(new File("d://a.txt"));
				
		
	}

}