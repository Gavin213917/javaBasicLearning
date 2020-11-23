package com.gavin.interfaceAndAbstract.abstractJava;

public abstract class Father {
	
	public String username;
	int age;
	
	
	//有抽象方法的类一定是抽象类，抽象类不一定有抽象方法。
	//抽象类是不能实例化对象的，不能new
	public abstract void buyCigarette();
	
	//试题 A
		public void sleepA(){
			System.out.println("到了十二点了，要去睡觉了...");
		}
	
}