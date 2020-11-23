package com.gavin.lambda.s4;

public class Test {

	
	public static void main(String[] args) {
		/**
		 * 关于匿名内部类和Lambda表达式的的区别：
		 * 1:匿名内部类可以任意接口创建实例，--不管接口包括有多少个抽象方法，只要匿名内部类实现所有的抽象方法即可，但是Lambda表达式只能为函数式接口创建实例
		 * 2:匿名内部类可以为抽象类甚至普通类创建实例，但是Lambda表达式只能为函数式接口创建实例。
		 * 3:匿名内部类实现的抽象方法体允许调用接口中定义的默认方法，但是在Lambda表达式中不允许调用默认方法。
		 */
		
	}
}
