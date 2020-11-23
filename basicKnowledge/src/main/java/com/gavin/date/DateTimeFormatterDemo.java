package com.gavin.date;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormatterDemo {

	public static void main(String[] args) {
		
		Clock clock = Clock.systemUTC();
		LocalDateTime date = LocalDateTime.now(clock);
		
		System.out.println(date.format(DateTimeFormatter.ISO_DATE));
		System.out.println(date.format(DateTimeFormatter.ISO_DATE_TIME));
		System.out.println(date.format(DateTimeFormatter.ISO_LOCAL_DATE));
		System.out.println(date.format(DateTimeFormatter.ISO_TIME));
		System.out.println(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		
		
		String str1 = "2014/12/12 12:12:12";
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		//执行解析
		LocalDateTime dTime = LocalDateTime.parse(str1,dateTimeFormatter);
		System.out.println(dTime);
		
		
		
		
	}
}
