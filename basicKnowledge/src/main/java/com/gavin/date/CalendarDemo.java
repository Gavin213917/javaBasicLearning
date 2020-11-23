package com.gavin.date;

import java.util.Calendar;
import java.util.Date;


public class CalendarDemo {

	public static void main(String[] args) {
		
		//抽象类，接口。说明不能创建对象---派生子类，工厂方法
		//java.util.Calendar 抽象类 位了弥补Date的设计，提供日历类，更好的处理日期和时间
		Calendar calendar = Calendar.getInstance();
		//动态设置日期
		calendar.set(2016, 4, 1, 12, 12,12);
		//添加日期
		calendar.add(Calendar.YEAR, 1);//加一年
//		calendar.add(Calendar.YEAR, -1);//减去一年
		calendar.add(Calendar.MONTH, 1);//加一个月
		Calendar calendar2 = Calendar.getInstance();
		
		//return (thisTime > t) ? 1 : (thisTime == t) ? 0 : -1;
		System.out.println("=====>"+calendar.compareTo(calendar2));//1代表大于  相等0  小于 -1
		
		System.out.println(calendar.getCalendarType());
		System.out.println(calendar.getTimeInMillis());//获取毫秒数
		
		//Calendar转成日期类
		Date date= calendar.getTime();
		System.out.println(date);
		System.out.println(calendar.get(Calendar.YEAR));
		System.out.println(calendar.get(Calendar.MONTH)+1);
		System.out.println(calendar.get(Calendar.DATE));
		System.out.println(calendar.get(Calendar.WEDNESDAY));
		System.out.println(calendar.get(Calendar.HOUR));
		System.out.println(calendar.get(Calendar.MINUTE));
		System.out.println(calendar.get(Calendar.SECOND));
		
		
		//日期类转成Calendar
//		Date date2 = new Date();
//		calendar.setTime(date2);
		
//		System.out.println(calendar.getFirstDayOfWeek());
		
		
		//joda-time.jar datetime.jar
		//我获取今天在一年中第一个周
		//获取今天的开始时间和结束时间
		//我要
		
	}
}
