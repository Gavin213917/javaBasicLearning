package com.gavin.object.finalJava;

import java.util.ArrayList;
import java.util.List;

public class FinalDemo {
	/**
	 * 在Java中，final的作用主要有一下三个方面
	 * 第一，被final修饰的类不能被继承。
	 * 第二，被final修饰的方法不能被重写。
	 * 第三，被final修饰的变量不能被重新赋值。(常量)
	 * 
	 * 第四，被final修饰的成员变量一定要赋初始值。或者一开始不赋值，在代码块里面赋值，但是这样做没有意义。
	 * 
	 * 第五，被final修饰的局部变量不一定要赋初始值。但是只能赋值一次。
	 * 
	 * 第六，针对基础数据类型和应用数据类型
	 * 如果是引用数据类型被final修饰的话，就一定要赋值，而且不能是null。修饰数据的引用数据类型内部的值还是可以修改的
	 * 
	 * 
	  * 常量：1、必须是公开的 2、变量名一定全部大写，这样可以区分是常量还是普通变量
	 * 
	 * 
	 * 
	 */
	public static final  List<Integer> findUser() {
		final List<Integer> nums = new ArrayList<>();
		nums.add(1);
		nums.add(2);
		nums.add(3);
		return nums;
	}
	
	public static void main(String[] args) {
		final List<Integer> nums = findUser();
		nums.set(0, 22);//list（类） 被final 修饰，里面的值是可以修改的
		
		for (Integer integer : nums) {
			System.out.println(integer);
		}
		
		//数据是引用类型，它是在堆里面开辟内存空间的
		final int [] num = {1,2,3};
		num[0] = 8;//可以修改
		
	}
	
	
	
	

}
