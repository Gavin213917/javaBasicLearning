package com.gavin.object.outter;

/**
 * 函数内部类
 * @author 18158
 *
 */
public class Outter4 {

	
	public void Test(){
		class Person{
			String username = "keke";
		}

		
		class Person2 extends Person{
			public void test(){
				System.out.println(username);
			}
		}
		
		Person2 person = new Person2();
		person.test();
		
	}
	
	public static void main(String[] args) {
		Outter4 iOutter4 = new Outter4();
		iOutter4.Test();
	}
}
