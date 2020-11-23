package com.gavin.interfaceAndAbstract.abstractJava;

public class Test {

	public static void main(String[] args) {
		//只能拿到重写（覆盖）父类的那一部分，buyCigarette();方法
		Father father = new SonA();//多态，Father father--编译时类型，new SonA()--运行时类型，当编译时类型和运行时类型不一致就会引发多态。
		father.buyCigarette();
		//father.password //拿不到sonA自己的属性和方法
		
		SonA sonA = new SonA();
		sonA.buyCigarette();
		sonA.password = "123";//必须要赋值
		
		
	}

}