package com.gavin.extend;

public class Son extends Father{
	public String name="keke";
	/**
	 * 
	 * 创建一个新的实例 KeKe.
	 * super在每一个类创建对象的时候吗，都会有代码，只不过是隐士调用，
	 * 1：如果没有一个类没有继承，super指向的是 Object
	 * 2:如果有继承，super()指向的是你父类的构造函数。super是父类的一个引用对象
	 */
	
	public Son(){
		super();//super的隐式调用
		System.out.println("C");
	}
	
	
	//方法重写--针对方法
	/**
	 * 重写(覆盖)：一定publice protected
	 * 1:一定继承的前提下.
	 * 2:必须和父类方法名一摸一样，方法的访问，返回值，方面，参数列表一摸一样
	 * 3:修饰符一定大于等于父类
	 * 4：识别是 不是重写父类的方法，@Override
	 * 
	 * 目的：是覆盖父类方法的业务逻辑。进而自己去实现.重写就是多态的一种体现。
	 * 
	 * 
	 * 重载：针对当前类而已，只要你的方法的参数类型的列表不一致即可。
	 */
	
	@Override
	public void println(){
		System.out.println("子类的打印哦!!!");
	}
	
	@Override
	public String println(String name){
		return "success";
	}
	
	public String test(){
		System.out.println("ress");
		return "success";
	}

}
