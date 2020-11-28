package com.gavin.utils;


public class Equals {

	public static void main(String[] args) {
		//  == 判断两个内存地址是否相同 
		// == 如果基础数据类型比较都是相等的话都是true. byte short int long float double char true/f
		
		//值比较
//		int aa=1;
//		int bb = 129;
//		int cc=1;
//		float ff = 1;
//		Integer dd=1;
//		Integer ee =129; 
//		System.out.println(aa==cc);//true
//		System.out.println(aa==dd);//true
//		System.out.println(aa==ff);//true
//		System.out.println(dd==ff);//true
//		System.out.println(bb==ee);//true
//		
		//封装数据类型-类---都是引用比较,要用equals
//		Float float1=36f;
//		Float float2=36f;
//		System.out.println(float1==float2);//false
//		System.out.println(float1.equals(float2));//true
		
		//Byte Short Integer Long 缓存一个范围：-128--127 和单列模式都是真，其他情况都是false
//		Integer a=127;
//		Integer b=127;
//		System.out.println(a==b);//true
//		System.out.println(null==null);//true
//		
//		System.out.println(Byte.MAX_VALUE);//127
//		System.out.println(Byte.MIN_VALUE);//-128
		
		
		
		
		
//  	equals 判断两个值相等(有误)(同一数据类型) ，equals 它是一个方法，是由对象去调用的
//		Integer a =1;
//		Integer b = 1;
//		Float c = 1f; 
//		System.out.println(a.equals(b));//true
//		System.out.println(c.equals(b));//false 不是同一种数据类型
//		System.out.println(null==null);//true ,空是可以比较的
		
//		System.out.println(null.equals(null));//编译通不过
//		null.eqauls(null);//错误的，编译通不过
//		System.out.println(a.eqauls(null));//
//		null.equals(a);//错误的，编译通不过
//		
		
		//Integer a ;
		//if(!a.eqauls("") && a!=null){//错误的
	
		//}
		
		//if("".equals(a) && null!=a){//错误的
		
		//}
		
//		if(a!=null && a.equals("")){//正确的
		
//		}
		
		float ac=5.0f;
		System.out.println(1>2?ac:6);//6.0
		System.out.println(1>2?5.0:6);//6.0
		
		
		
	}
}
