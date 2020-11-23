package com.gavin.extend;

public class Z extends X{

	//实例化了
	Y y = new Y();
	
	public Z() {
		super();//执行父类的构造方法，调用构造函数
		System.out.println("Z");
	}
}
