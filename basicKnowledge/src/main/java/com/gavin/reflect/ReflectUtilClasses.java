package com.gavin.reflect;

import java.lang.reflect.Array;
import java.lang.reflect.Constructor;

import org.omg.CORBA.PUBLIC_MEMBER;

public class ReflectUtilClasses {

	public static void main(String[] args) {
		/*
		 * 类中：
			 * 成员变量
			 * 构造函数
			 * 成员方法
			 * 内部类
			 * 代码块
		 * */
		
		/*
		 * 反射操作---内部还是用对象
		 * 第一步：拿到当前类的class对象
		 * 第二步：还要实例化对象
		 * 第三步：开始动态解析class文件中的构造函数，成员变量，成员方法，内部类 (注解和参数)
		 * */
		
//		Class clz = User.class;
		
//		User user = new User();
//		Class clz = user.getClass();
		
		try {
			//第一步：拿到当前类的class对象
			Class clz = Class.forName("com.gavin.reflect.User");
			//实例化对象  
			Object obj = clz.newInstance();
			
			Class[] classes = clz.getDeclaredClasses();
			for (Class class1 : classes) {
				System.out.println(class1.getName());
			}
			
		} catch (Exception e) {
			
			
		}
		
		
		//test(1,2,3,4,5,6,7,8,9);
//		int[] ages = {1,2,3,4,5,6,7,8,9};
//		test(ages);
	}
	
	
//	public static void test(int...ages){
//		for (int i : ages) {
//			System.out.println(i);
//		}
//	}
	
	
	
	
	
}
