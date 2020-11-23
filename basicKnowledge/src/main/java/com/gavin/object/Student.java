package com.gavin.object;

import java.sql.Date;

public class Student {

	//属性
	private String name;
	private Float money;
	private String address;
	private Date birthday;
	private Integer age;
	
	//行为
	public void buyBook(String message){
		int age2=10;//局部变量
		System.out.println(this.name+"==="+this.money+"买了以一本书"+age);
		//方法体---动态开辟的
		print(message);
	}
	
	public void print(String message){
		System.out.println(message);
	}
	
	//类描述客观世界里某"一类"对象的事物特性（属性和行为）(某一个类事物的集合和抽象),而对象则是类的具体存在。
	//类也模板
	
	
	//strong 同学有一百块钱----买书
	//keke 同学有20块钱----买书
	
	
	
	//类-一般来说：构造函数，属性，方法（行为）和代码块。
	//方法就是函数，
	
	
	/*
	 * 
	 * 成员（属性和方法）
	 * 类的结构：
	 * 访问修饰符  类名 {
	 *    
	 *    
	 *    
	 *      //构造函数
	 *      1、申请内存空间的地址（创建对象的），如果一个类中没有定义构造，就自动调用默认的构造函数
	 *      2、给（私有）属性赋值
	 *      3、构造函数可以重载
	 *      
	 *      访问修饰符  类名(){}//构造函数
	 *      访问修饰符  类名(参数列表){}//构造函数
	 *      .
	 *      .
	 *      .
	 *      
	 *     //属性定义
	 *     [访问修饰符]   [修饰词(static final)] 数据类型  变量名  = 值;
	 *     [访问修饰符]   [修饰词(static final)] 数据类型  变量名;
	 *     .
	 *     .
	 *     .
	 *   
	 *      
	 *      
	 *     //方法----
	 *     [访问修饰符 ] [修饰词(static final)]  返回值   方法名{
	 *         //方法体
	 *         
	 *         
	 *      }
	 *      
	 *      
	 *      //代码块 ---赋值使用的，初始化成员变量的，编译阶段就写入到Java堆，在申请内存空间之前（构造函数）
	 *      1、静态代码块--只能初始化静态成员变量
	 *      static {
	 *      
	 *      }
	 *      
	 *      //普通代码块--既可以初始化静态成员变量，也可以初始化非静态成员变量
	 *      {
	 *      
	 *      }
	 *      
	 * 		执行顺序：静态代码块>普通代码块>构造函数
	 * }
	 *   
	 * 
	 * 
	 * */
	
	
	/*
	 * 
	 * 	八种数据类型
	 * byte short int long 
	 * float double 
	 * boolean 
	 * char
	 * 
	 * 数值型和布尔型
	 * 
	 * 我们把类当做一种特殊的数据类型.类模板--属性赋值的---
	 * 
	 * 
	 * */
	
	
	public int sum(){
		int a=1;
		int b=1;
		int c=a+b;
		return c;
	}
	
	
	public static void main(String[] args) {
		//对象怎么来---肯定类有关系

		//对象是通过类的构造函数(析构函数)去堆里去申请出来一块内存空间地址,申请过程---其实就是非静态成员拷贝的过程.
		
		Student keke = new Student();
		
		keke.name="keke";
		keke.address="湖南长沙";
		keke.age = 30;
		keke.money = 12.5f;
		
		
		
		int num = keke.sum();
		System.out.println(num);
		
//		keke.buyBook("你太帅了....");//其实就是通知cpu执行方法体的过程，形成独立的内存空间，里面数据类型是随着方法执行完毕，而结束
		//对象属性，局部变量，参数属性
		
		
//		Student dawei = new Student();
//		dawei.name="大为";
//		dawei.address="上海";
//		dawei.age = 16;
//		dawei.money = 12.5f;
//		
		
		
	}
	
	
	
	
}