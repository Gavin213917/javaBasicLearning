package com.gavin.lambda.s4;

@FunctionalInterface
public interface Displayable {
	int a=10;
	public void display();
	
	//默认方法
	default int add(int a,int b){
		return a+b;
	}
	
	default int munis(int a,int b){
		return a-b;
	}
}
