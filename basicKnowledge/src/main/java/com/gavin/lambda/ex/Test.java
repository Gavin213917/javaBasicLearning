package com.gavin.lambda.ex;

import java.util.Arrays;
import java.util.Comparator;

import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class Test {

	
	public static void main(String[] args) {
//		Addable addable = new Addable() {
//			
//			@Override
//			public int add(int a, int b) {
//				return a+b;
//			}
//		};
//		
//		
//		addable.add(10, 10);
		
//		Lambda表达式的主要作用就是替代匿名内部类的繁琐语法：它有三部分组成：
//		1：形参列表,形参列表允许省略形参类型，如果形参列表只有一个参数，甚至连形参列表的括号也可以省略。
//		2:箭头(->) 
//		3:代码块：//方法要执行的函数体和返回一个具体的实例对象
		
		
		
		
		
//		Addable addable = (a,b)->a+b;
//		System.out.println(addable);
//		int count = addable.add(10, 10);
//		System.out.println(count);
		
		
		Eatable eatable = ()->{
			System.out.println("我想吃东西");
		};
//		eatable.taste();
		//如果接口中定义的函数，没有形参的，你的函数体的{}可以省略,包括return也可以省略
//		Eatable eatable = ()->System.out.println("我想吃东西");
//		eatable.taste();
		
//		Flyable flyable = (weather)->{
//			System.out.println("今天的天气是:"+weather);
//			System.out.println("我就在家里睡觉吧，看书吧....");
//		};
//		flyable.fly("下雨");
//		
//		Flyable flyable2 = weather->{
//			System.out.println("今天的天气是:"+weather);
//			System.out.println("我就在家里睡觉吧，看书吧....");
//		};
//		
//		flyable2.fly("出太阳");
		
//		Addable addable = (a,b)-> a+b;
//		System.out.println(addable);
//		int result = addable.add(5,8);
//		System.out.println(result);
//		
//		Addable addable2 = (a,b)-> a*b;
//		System.out.println(addable2);
		
		
		
//		ConvertFK convert =(str)->{
//			return Integer.parseInt(str);
//		};
		
//		ConvertFK convert =str->Integer.parseInt(str);
//		ConvertFK convert =Integer::parseInt;//只有一个参数的情况下
		
		
//		Integer num = convert.convert("99");
//		System.out.println(num);
		
		
//		String string = "i love you ";
//		System.out.println(string.substring(0, 9));
		
//		SubStrFk strFk = (a,b,c)->{
//			return a.substring(b,c);
//		};
		
//		SubStrFk strFk = String::substring;
//		SubStrFk strFk = String::toUpperCase;
//		String result = strFk.toUpper("i love you ");
//		System.out.println(result);
		
		
		//匿名内部类和lambda表达式的区别
		
		
		Integer[] nums = {1,2,4,7,8,9,44,5,8742,12,18,1,0,54,};
//		Arrays.sort(nums,new Comparator<Integer>() {
//			@Override
//			public int compare(Integer o1, Integer o2) {
//				return o2-o1;
//			}
//		});
		
//		Arrays.sort(nums,(a,b)->{
//			return b-a;
//		});
//		
//		for (int i : nums) {
//			System.out.println(i);
//		}
		
		
		Runnable runnable = ()->{
			for (int i = 0; i < 100; i++) {
				System.out.println(i);
			}
		};
		
		Thread thread = new Thread(runnable);
		thread.start();
		
	}
}
