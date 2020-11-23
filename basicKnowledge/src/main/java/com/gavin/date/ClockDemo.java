package com.gavin.date;

import java.time.Clock;
import java.time.Instant;
import java.util.Date;

public class ClockDemo {

	public static void main(String[] args) {
		
		long s = System.currentTimeMillis();
		//获取当前的Clock对象
		Clock clock = Clock.systemUTC();
		System.out.println("获取当前的时刻："+clock.instant());
		System.out.println(clock.millis());
		System.out.println(System.currentTimeMillis());
		System.out.println(new Date().getTime());
		long e = System.currentTimeMillis();
		System.out.println(e-s);
		
		
//		Instant instant = clock.instant();
		Instant instant = Instant.now();//日期的加减
		Instant instant2 = Instant.parse("2016-05-27T14:39:10.386Z");
	}
}
