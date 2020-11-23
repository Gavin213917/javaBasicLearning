package com.gavin.object.outter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {


	public static void main(String[] args) {
//		Outter outter = new Outter();
		
//		Outter2 outter2 = new Outter2();
//		outter2.age = 10;
//		Outter2.username = "keke";
//		outter2.say();
//		Outter2.message();
		
//		Outter2.Inner inner = outter2.new Inner();
//		inner.name = "zhangsan";
//		inner.username = "zhangsan";
//		inner.test();
		
//		Outter3 outter3 = new Outter3();
//		outter3.age = 10;
//		Outter3.username = "keke";
//		outter3.say();
//		Outter3.message();
//		
//		Outter3.Inner inner = new Outter3.Inner();
//		inner.name = "zhangsan";
//		inner.username = "zhangsan";
//		Outter3.Inner.test();
		
		
		Outter5 outter5 = new Outter5();
//		IResultList resultListImpl = new ResultListImpl();
//		java.util.List<String> strings = outter5.list(resultListImpl);
//		for (String string : strings) {
//			System.out.println(string);
//		}
//		Collections.sort(null, new Comparator<T>() {
//			@Override
//			public int compare(T o1, T o2) {
//				return 0;
//			}
//		});
		
		//springjdbctemplate
//		Runnable runnable = new Runnable() {
//			@Override
//			public void run() {
//				
//			}
//		};
		
		
		final List<String> users = new ArrayList<>();
		//匿名内部类
		 outter5.list(new IResultList() {
			@Override
			public List<String> queryList() {
				users.add("keke111");
				users.add("zhangsa11n");
				users.add("xiaobai");
				users.add("xiaoxiong");
				return users;
			}
		});
		
		for (String string : users) {
			System.out.println(string);
		}
//		
	}
}
