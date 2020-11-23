package com.gavin.date;

import java.text.ParseException;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateDemo {

	public static void main(String[] args) throws ParseException {
		
		Date date = new Date();
		System.out.println(date);
		/*
		 * Thu    May   26     23:10:43 CST 2016---  格林士日期:当前时间距离1970年1月1日 00:00:00de一个时间差，以毫秒作为单位
		 * 星期四      五月份    26号        时:分:秒     时区    年份
		 * 星期         月份      日期      时:分:秒     时区    年份
		*/
		
		System.out.println(date.getYear());
		System.out.println(date.getMonth()+1);//
		System.out.println(date.getDate());//26
		System.out.println(date.getDay());//0星期日1 2 3 4 5 6 
		System.out.println(date.getHours());
		System.out.println(date.getMinutes());
		System.out.println(date.getSeconds());
		long time = date.getTime();//距离1970毫秒数
		System.out.println(time);
//		System.out.println(date.getTimezoneOffset());
		
//		Date date2 = new Date(time);
//		System.out.println(date2);
		Date date2 = new Date("2015/12/12");
		System.out.println(date2);
		Date date3 = new Date("2015/12/13");
//		System.out.println(date2);
//		System.out.println(date2.after(date3));//date2日期是否在date3之后
//		System.out.println(date2.before(date3));//date2日期是否在date3之前
		
		long s1 = date2.getTime();
		long s2 = date3.getTime();
		System.out.println(s1>s2);
		System.out.println(s1<s2);
		
		
//		String dString = "20160526231616";
//		Date d = new SimpleDateFormat("yyyyMMddHHmmss").parse(dString);
//		String dString2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(d);
//		System.out.println(dString2);
		
		
		
	}

}
