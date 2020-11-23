package com.gavin.lambda.ex;

@FunctionalInterface
public interface LambdaFk {

	//抽象方法
	public void display();
	
	
	//默认方法.可以定义多个
	default int sum(int a,int b){
		return a+b;
	}
	
	//静态方法,可以定义多个
	static void sayHello(){
		System.out.println("你好!!!");
	}
}
