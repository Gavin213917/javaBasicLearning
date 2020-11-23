package com.gavin.lambda.s4;

public class LambdaInner {

	
	private int age=12;
	private static String name="我是keke老师";
	public void test(){
		String book = "Java very good";
		Displayable displayable = ()->{
//			book = "sdf"; //修改报错，因为这个时候book是一个effectively final的局部变量
			System.out.println("局部变量是:"+book);
			System.out.println("外部类的age实例变量为："+age);
			System.out.println("外部类的name实例变量为："+name);
			//这里不允许调用默认方法，编译通不过
			//add(10,10)//complie error
		};
		displayable.display();
		displayable.add(10, 10);
	}
	
	public static void main(String[] args) {
		//匿名内部类
//		Displayable displayable = new Displayable() {
//			
//			@Override
//			public void display() {
//				this.add(10, 20);
//			}
//		};
		
		LambdaInner inner = new LambdaInner();
		inner.test();
	}
}
