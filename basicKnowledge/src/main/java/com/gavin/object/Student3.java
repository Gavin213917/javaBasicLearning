package com.gavin.object;

public class Student3 {
	
	/**
	 * 类---是一种数据类型（自定义数据类型）-----Integer  String
	 * 
	 * 构造函数： 
	 * 1、申请内存空间的地址（创建对象的），如果一个类中没有定义构造，就自动调用默认的构造函数 
	 * 2、给（私有）属性赋值 
	 * 3、构造函数可以重载
	 * 
	 * a:构造函数，是函数，也会被执行，只不过是在调用之前执行的方法。
	 * b:在创建对象的时候，会自动调用Java提供的默认的构造函数。
	 * c:如果你进行了函数的重载，那么就会覆盖默认的构造函数。如果你想继续使用无参的构造函数，那么就必须显示定义无参的构造函数。
	 * 
	 * 两层含义：赋值和申请空间
	 * 
	 * 
	 * 
	 */
	private  String name;
	private int age;
	private Float money;

	public Student3() {//spring ioc 构造函数注入
		System.out.println("我是构造函数哦，我会先执行。。。。。");

	}
	//方法的重载
	public Student3(int age) {//spring ioc 构造函数注入
		System.out.println("我是构造函数哦，我会先执行。。。。。");
		this.age =age;

	}
	
	public Student3(String name ,int age) {//spring ioc 构造函数注入
		System.out.println("我是构造函数哦，我会先执行。。。。。");
		this.name = name; 
		this.age =age;

	}
	
	public Student3(String name ,int age,Float money) {//spring ioc 构造函数注入
//		this.name = name; 
//		this.age =age;
		this(name,age);//必须放在第一位，执行方法
		this.money = money;
 		System.out.println("我是构造函数哦，我会先执行。。。。。");

	}
	
	public static void main(String[] args) {
		Student3 student = new Student3();
		student.name = "gavin";
		System.out.println(student.name);
		
		Student3 student2 = new Student3();
		System.out.println(student2.age);
		
	}

}