package com.gavin.reflect;

import java.lang.reflect.Array;
import java.lang.reflect.Constructor;

import org.omg.CORBA.PUBLIC_MEMBER;

public class ReflectUtilConstructor {

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
			//实例化对象  1
			Object obj = clz.newInstance();
			//解析构造函数   Declared 代表忽略访问修饰符, 如果不加的只能访问public修饰的成员属性(变量和方法)
//			Constructor[] constructors = clz.getConstructors();//只能访问public修饰的构造函数
			Constructor[] constructors = clz.getDeclaredConstructors();//忽略访问修饰符的构造函数
//			System.out.println("构造函数的个数是:===="+constructors.length);
			for (Constructor constructor : constructors) {
				System.out.println("构造函数的名称"+constructor.getName());
				System.out.println("访问修饰符:"+constructor.getModifiers());
				System.out.println("构造函数中参数的个数:"+constructor.getParameterCount());
				
				Class[] types = constructor.getParameterTypes();
				for (Class class1 : types) {
					System.out.print(class1.getName()+"\t");
				}
				System.out.println("======================");
			}
			
			
			//获取单个的情况 ---spring构造函数注入
			//实例化对象  2
			Constructor constructor = clz.getDeclaredConstructor();
			Object object  = constructor.newInstance();
			System.out.println("1========="+object);
			
			
			Constructor constructor2 = clz.getDeclaredConstructor(Integer.class,String.class,Float.class,String[].class,Long.class);
			String[] names = {"keke","xiaobai"};
			Object object2  = constructor2.newInstance(1,"keke",21.5f,names,1l);
			System.out.println("2==========>"+object2);
			
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
