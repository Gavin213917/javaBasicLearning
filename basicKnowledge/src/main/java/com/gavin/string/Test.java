package com.gavin.string;

public class Test {
	public static void main(String[] args) {
		
		//第一种
//		String a = "A" +  "B" + "C";//在编译时，已经确定了a的值就是ABC
//		String e = "ABC";
//		
//		String b = "AB";
//		String c = "C";
//		
//		String f = b+ c ;//在编译阶段不能确定f的值。
//		
//		System.out.println(a==e);//true
//		System.out.println(a==f);//false
		
		//第二种
		String a = "A" +  "B" + "C";//在编译时，已经确定了a的值就是ABC
		String e = "ABC";
		
		final String b = "AB";//加上final ，变成宏变量 ，在编译的时候确定 b 是普通变量还是宏变量，如果是宏变量，则会强制约束在编译的过程中值就会确定下来，减少垃圾的产生
		final String c = "C";
		
		String f = b+ c ;//在编译阶段不能确定f的值。
		
		System.out.println(a==e);//true
		System.out.println(a==f);//true
		
		
	}

}
