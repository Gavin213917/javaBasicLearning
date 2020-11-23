package com.gavin.object.staticJava;

public class StaticDemo3 {
	
	
	//静态成员在编译的时候就已经确定内存空间的大小，和当前类本身捆绑在一起，存放入静态区中。---栈区
	//非静态成员，在new在申请空间地址的时候 创建的=---堆区
	
	
	public static int num;
	public  int num2;
	
	//总结：
	//1:静态方法中只能调用静态成员
	//2:非静态方法可以调用静态成员也可以调用非静态成员
	//3:静态成员，一定通过类去调用，
	//4:既然静态方法属于类，那么方法就不能用this关键字
	
	public static void test(){
		//---访问修饰符--继承-final
	}
	
	
	public  void test3(){
		System.out.println(this.num2+"==="+StaticDemo3.num);
	}
	
	
	
	public static void main(String[] args) {
		
		StaticDemo3.test();
		
		StaticDemo3 demo=new StaticDemo3();
		demo.num2++;
		StaticDemo3.num++;//静态成员:通过类名去调用
		
		StaticDemo3 demo2=new StaticDemo3();
		demo2.num2++;
		StaticDemo3.num++;
		
		System.out.println("demo==="+demo.num2);//1
		System.out.println("demo2===="+demo2.num2);//1
		
		
		System.out.println("静态成员:demo==="+StaticDemo3.num);//2
		System.out.println("静态成员:demo2===="+StaticDemo3.num);//2
		
	}
	
	
	
	
	
	
	
	
}
