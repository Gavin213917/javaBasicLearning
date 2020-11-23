package com.gavin.interfaceAndAbstract.abstractJava;

public abstract class PhoneMessage {
	public PhoneMessage(){
		super();
	}
	
	public PhoneMessage(String username){
		super();
	}
	
	//抽象方法---作用就是让子类一定要重写的部分,不需要自我实现的部分
	/**
	 *  抽象类中不一定存在抽象方法，
	 *  但是抽象方法一定只能在抽象类中定义
	 *  
	 *  
	 *  抽象类：
	 *  不能实现化对象，但是可以定义构造函数.
	 *  实现抽象类，方式有两种---一种:通过匿名内部类，一种是：具体子类
	 *  1:抽象类必须使用abstract修饰，抽象方法必须用abstract修饰，抽象方法中不能有具体的实现。
	 *  2:抽象类不能被实例化对象的，但是可以定义构造函数，目的是给当前抽象类的私有成员属性赋值目的。（注：一种:通过匿名内部类，一种是：具体子类）
	 *  3:抽象方法，必须定义在抽象类中或者接口中。如果有抽象方法就要必然是抽象类或者接口。
	 *  4:final不能够abstract共用
	 *  5:不能私有private 可以是public protected
	 *  6:没有抽象属性的概念
	 */
	public abstract String sendMessage(String message);
	public abstract void callPhone(String telephone);

}
