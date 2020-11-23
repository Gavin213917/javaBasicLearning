package com.gavin.object;

import java.sql.Date;

public class Student2 {

	//属性--全局变量
	
	/*
	 * 
	 * 全局变量---定义在方法以外，类以内的变量就是全局变量
	 * 全局可以不用赋值的---
	 *   如果是基础数据类型，
	 *   byte short int long 0
	 *   float double  0.0
	 *   boolean false
	 *   char \u0000  空各 都会用他们的默认值
	 *   如果封装类型类型和类：都null
	 * */
	private String name;
	private Float money;
	private String address;
	private Date birthday;
	
	private Integer age;
	private boolean mark;
	private int num;
	
	
	/*
	 * 局部变量:
	 * 定义在方法或者代码块以内的变量就局部变量。
	 * 	1：如果使用了就一定赋值，
	 *  2：局部变量会随着方法的执行完毕，生命周期结束
	 *  在作用域是以{}为周期，如果{}以外那么就已经消亡
	 * */
	
	//行为
	public void buyBook(String message){
		//尽量在开发过程中，不要和全局变量定义相同的名字，
		int age=10;
		System.out.println(this.age);
	}
	
	
	public static void main(String[] args) {
		
		
		//只有对象才能给属性赋值，和调用方法
		Student2 student2 = new Student2();
		System.out.println(student2.name);
		
		System.out.println(student2.age);
		System.out.println(student2.mark);
		System.out.println(student2.num);
		
	}
	
}