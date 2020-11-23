package com.gavin.enumJava;

public class WeekEnumTest {
	
	
	public static void getPlan(WeekEnum week){
		switch (week) {
		case Monday:
			System.out.println("今天是星期一,我要睡觉");
			break;
		case Thursday:
			System.out.println("今天是星期二,我要去爬山");
			break;
		case Wednesday:
			System.out.println("今天是星期三,我要游泳");
			break;
		case Tuesday:
			System.out.println("今天是星期四,....");
			break;
		case Friday:
			System.out.println("今天是星期五");
			break;
		case Sunday:
			System.out.println("今天是星期六");
			break;
		case Saturday:
			System.out.println("今天是星期日");
			break;

		default:
			break;
		}
	}
	
	public static void main(String[] args) {
//		System.out.println(WeekEnum.Monday);
//		System.out.println(WeekEnum.Thursday);
//		System.out.println(WeekEnum.Wednesday.ordinal());//这个是拿到当前元素在某枚举类中定义的位置
//		System.out.println(WeekEnum.Tuesday);
//		System.out.println(WeekEnum.Friday);
//		System.out.println(WeekEnum.Sunday);
//		System.out.println(WeekEnum.Saturday);
		
//		getPlan(WeekEnum.Monday);
//		getPlan(WeekEnum.Thursday);
		
		
		
		//循环获取 values
		for (WeekEnum weekEnums  : WeekEnum.values()) {
			System.out.println(weekEnums.name());
		}
		
		
//		byte short int  char 枚举 string 
		//key可以允许的类型有哪些： byte short int   char ---枚举 和枚举
		
		//构造一个枚举对象对
//		WeekEnum weekEnum = WeekEnum.valueOf("Monday");
//		switch (weekEnum) {
//		case Monday:
//			System.out.println("今天是星期一");
//			break;
//		case Thursday:
//			System.out.println("今天是星期二");
//			break;
//		case Wednesday:
//			System.out.println("今天是星期三");
//			break;
//		case Tuesday:
//			System.out.println("今天是星期四");
//			break;
//		case Friday:
//			System.out.println("今天是星期五");
//			break;
//		case Sunday:
//			System.out.println("今天是星期六");
//			break;
//		case Saturday:
//			System.out.println("今天是星期日");
//			break;
//
//		default:
//			break;
//		}
		
		
//		WeekEnum weekEnum = WeekEnum.valueOf("Monday");
		int mark = TzConstanst.WEEK_Sunday;//7
		switch (mark) {
		case 1:
			System.out.println("今天是星期一");
			break;
		case 2:
			System.out.println("今天是星期二");
			break;
		case 3:
			System.out.println("今天是星期三");
			break;
		case 4:
			System.out.println("今天是星期四");
			break;
		case 5:
			System.out.println("今天是星期五");
			break;
		case 6:
			System.out.println("今天是星期六");
			break;
		case 7:
			System.out.println("今天是星期日");
			break;
		default:
			break;
		}
	}
	
	
}
