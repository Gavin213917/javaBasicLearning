package com.gavin.object;


public class Person2 {
	// 类---自定义数据类型---成员变量（全局变量）
	private int age;
	private static String name;

	// 静态代码块--只能初始化静态成员变量
	static {
		name = "gavin";
		System.out.println("1----我是静态代码块哦！！！我会第一个执行，在编译申请内存空间之前");
	}

	// 普通代码块--既可以初始化静态成员变量，也可以初始化非静态成员变量
	{
		age = 20;//不会被调用
		name = "zhangsan";
		System.out.println("2----我是普通代码块哦！！！我会二个执行，在编译申请内存空间之前");
	}
	
	//後面的代码块会将前面的代码块覆盖
	{
		name= "baby";
	}

	/*  运行结果：
	 *  1----我是静态代码块哦！！！我会第一个执行，在编译申请内存空间之前
		2----我是普通代码块哦！！！我会二个执行，在编译申请内存空间之前
		3---我是构造函数，我会三个执行,在申请内存空间，编译之后执行
		30====baby
	 */
	
	
	// 构造函数
	public Person2() {

	}

	public Person2(int age) {
		this.age = age;
		System.out.println("3---我是构造函数，我会三个执行,在申请内存空间，编译之后执行");
	}
	
	public static void main(String[] args) {
		Person2 p = new Person2(30);//p 为对象
		System.out.println(p.age +"===="+ Person2.name);//非静态属性，通过对象去调用，静态属性，通过类名调用
	}

}
