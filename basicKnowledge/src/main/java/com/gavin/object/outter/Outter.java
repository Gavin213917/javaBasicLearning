package com.gavin.object.outter;

/**
 * 成员内部类（非静态内部类）---相当于一个一种成员方法
 * 静态内部类----相当一类中的静态方法
 * @author 18158
 *
 */
public class Outter {

	public int age;
	public static String username;
	
	//非静态方法中，即可调用成员变量和静态变量
	public void say(){
		System.out.println(this.age+"==="+Outter.username);
	}
	
	//静态方法中只能调用静态成员
	public static void message(){
		System.out.println("==="+Outter.username);
		
	}
	
	
	
}
