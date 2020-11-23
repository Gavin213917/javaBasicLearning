package com.gavin.interfaceAndAbstract;

public interface IUserDao {
	
	/*
	 * jdk 1.7
	 * 静态常量(final)，和抽象方法，枚举
	 * 
	 * 修饰符的范围：public 和缺省
	 * private和protected 不行
	 */
	public static final int AGE =10;
	public final static  String USERNAME="keke";
	
	
	
	
	//所有的方法都是抽象方法
	public  void test();//公开的
	void sayHello();//缺省的
	abstract void message();//abstract 可以省略
	
	//jdk1.8 静态方法，默认方法
	static void testcc(){
		System.out.println("ok");
	}
	
	default void hello(){//共享的方法
		System.out.println("你好吗");
	}

}
