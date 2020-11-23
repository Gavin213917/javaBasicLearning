package com.gavin.lambda.s1;

public class LambdaQs {

	
	public void eat(Eatable eatable){
		System.out.println(eatable);
		eatable.taste();
	}
	
	public void driver(Flyable flayable){
		flayable.fly("今天天气好好!!!");
	}
	
	public int test(Addable add){
		return add.add(5, 3);
	}
	
	
	/*
		Lambda表达式,是jdk8的新特性，允许使用更简洁的代码来创建只有"一个抽象方法"的"接口"的实例。
		
		1：必须接口，只有一个方法，你可以使用lambda表达式,@FunctionalInterface 告诉接口不允许定义其他的抽象方法
		
		Lambda表达式的主要作用就是替代匿名内部类的繁琐语法：它有三部分组成：
		1：形参列表,形参列表允许省略形参类型，如果形参列表只有一个参数，甚至连形参列表的括号也可以省略。
		2:箭头(->) 
		3:代码块：
	*/
	
	public static void main(String[] args) {
		
		LambdaQs qs = new LambdaQs();
		qs.eat(()->System.out.println("今天吃了什麼?"));
		qs.eat(()->{
			System.out.println("今天吃了什麼?22222222");
		});
		
		//只有一个参数的话，可以省去圆括号
//		qs.driver(weather->{
//			System.out.println("今天的天氣是:"+weather);
//			System.out.println("我們去郊遊吧!!!");
//		});
		
//		qs.driver(new Flayable() {
//			
//			@Override
//			public void fly(String weather) {
//				System.out.println("今天的天氣是:"+weather);
//				System.out.println("我們去郊遊吧!!!");
//			}
//		});
		
		int result = qs.test((a,b)->a*b);
		System.out.println(result);
	}
}
