package com.gavin.lambda.ex;

public class LambdaInner {

	private int age = 30;
	private static String name = "可可";
	
	public void test(){
		
		String address = "湖南长沙";
//		LambdaFk lambdaFk = new LambdaFk() {
//			@Override
//			public void display() {
//				System.out.println("当前的年龄是:"+age);
//				System.out.println("当前的名字是:"+name);
//				System.out.println("我的地址是:"+address);
//				LambdaFk.sayHello();
//				this.sum(10, 10);
//			}
//		};
		
		LambdaFk lambdaFk = ()->{
			System.out.println("Lambda当前的年龄是:"+age);
			System.out.println("Lambda当前的名字是:"+name);
			System.out.println("Lambda我的地址是:"+address);
		};
		
		lambdaFk.display();
		lambdaFk.sum(10, 20);
	}
	
	public static void main(String[] args) {
		LambdaInner inner = new LambdaInner();
		inner.test();
	}
}
