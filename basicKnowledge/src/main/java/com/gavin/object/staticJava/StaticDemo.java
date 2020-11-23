package com.gavin.object.staticJava;

import java.util.HashMap;

public class StaticDemo {
	
	
	//访问修饰符，super 一定要有继承的关系下才有意义。没有继承没有任何
	
	/*
	 * 属性和方法
	 * 
	 * 方法修饰符[private publie protected 缺省的]   修饰词(static ,final ,transient,volatile)   数据类型  = 字面值
	 * 
	 * 方法修饰符   修饰词   数据类型  = 字面值
	 *     
	 * */
	
	
	/*
	 * 在一个类中，
	 * 属性和方法中又分为两种情况
	 * 
	 * 	静态成员和非静态成员
	 * 
	 * 
	 *  静态成员是属性---类本身的,不属于对象=--共享属性和方法
	 *  静态成员一定要静态方法中使用
	 *  
	 *  总结：
	 *  非静态方法即可调用静态成员，也可以调用非静态元素
	 *  静态方法中只能给你调用静态成员
	 *  
	 * */
	
	private static int age;//静态属性（成员）--属于类
	private int num;//非静态属性（成员）--属于对象
	
	
	//非静态方法，既可以调用静态成员，也可以调用非静态成员
	public void buyBook(){
		System.out.println(StaticDemo.age);
		System.out.println(this.num);
	}
	
	
	public static void test(){
		System.out.println(StaticDemo.age);
	}
 	
	
	
	
	public static Float salary(String name){
		//薪资列表
		HashMap<String,Float> map=new HashMap<>();
		map.put("keke", 1000f);
		map.put("meta", 20000.58f);
		map.put("shubiao", 10000.88f);
		return map.get(name);
	}
	
	
	public static void main(String[] args) {
		Float float1 = salary("keke");
		System.out.println(float1);
	}
	
	
	
	
	
	
	
}