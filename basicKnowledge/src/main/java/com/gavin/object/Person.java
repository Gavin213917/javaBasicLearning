package com.gavin.object;

import java.util.Iterator;

public class Person {

	// 动态参数 object...params 其实就是一个数组
	//使用动态参数的建议：当我们参数列表的数据类型都是相同的数据类型的时候，参数类型>=3时，可以考虑使用动态参数，简化参数列表。
	//注意点：1、一个方法里面只能存在一个动态参数 2、动态参数必须放在参数列表的最后面
	public  int sum2(Object... params) {//可传任意类型
		for (Object object : params) {
			System.out.println(object);
		}
		return 0;
	}
	
	public  int sum(int... params) {
		int result = 0;
		for (int i = 0; i < params.length; i++) {
			result+=params[i];
		}
		return result;
	}
	
	public  int sum2(String name,int...params) {//动态参数必须放在参数列表的最后面
		return 0;
	}
	
	
	public  int sum(int a,int b, int c) {
		return a+b+c;
	}
	
//	public  int sum(int... params) {
//		return params[0]+params[1]+params[3];
//	}

	public static void main(String[] args) {
		//java 中参数的类型
		// 数值型 byte short int long float double char 和 布尔型 boolean
		// Byte Short Integer Long Float Double character Boolean --类
		// 数组
		// 自定义类型--类List（集合）
		
		Person person =new Person();
//		int res = person.sum(1,2,3,4,5);
//		System.out.println(res);
		
		//person.sum(1,"gavin",3,4,"@#");
		
		int [] num = {1,2,3,9}; //原理就是一个数组
		System.out.println(person.sum(num));
		

	}

}
