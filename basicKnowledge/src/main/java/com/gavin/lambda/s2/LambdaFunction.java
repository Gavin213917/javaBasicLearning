package com.gavin.lambda.s2;

public class LambdaFunction {

	public static void main(String[] args) {
		//Lambda的函数式接口：函数式接口代表只能包含一个抽象方法的接口。如果采用你们内部来语法来创建函数接口的实例，只需要实现一个抽象方法
		//这种情况下可以采用Lambda表达式来创建对象，该表达式创建出来的对象的目标类型就一个函数式接口，比如：Runnable,ActionListener等接口都是函数式接口
		//jdk1.8专门提供了：@FunctionalInterface注解，该注解通常放在接口定义的前面，该注解对程序功能没有任何作用，它用于告诉编译器执行更严格检查--检查该接口必须
		//是函数式接口，否则编译器就会报错。
		
		//1:Lambda表达式的目标类型必须是明确的函数式接口
		//2:Lambda表达式只能为函数式接口创建对象，Lambda表达式只能实现一个方法，因此他只能为只有一个抽象方法的接口创建对象。
		
//		Runnable runnable = ()->{
//			for (int i = 0; i < 100; i++) {
//				System.out.println(i);
//			}
//		};
//		
//		Thread thread = new Thread(runnable);
//		thread.start();
//		
		
		UserFK fk = ()->{
			System.out.println("保存用户信息");
		};
		fk.save();
	}
}
