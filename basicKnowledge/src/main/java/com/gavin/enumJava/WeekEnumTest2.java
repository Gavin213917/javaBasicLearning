package com.gavin.enumJava;

public class WeekEnumTest2 {
	
	
	
	public static void main(String[] args) {
		
		
		//创建对象的第一方式
		WeekEnum weekEnum = WeekEnum.valueOf("Tuesday");
		//创建对象的第二方式
		WeekEnum weekEnum2 = Enum.valueOf(WeekEnum.class, "Tuesday");
		
		
//		//成员变量
//		weekEnum2.name = "keke";
//		weekEnum2.test();
		
		
		
	
	}
	
	
}
