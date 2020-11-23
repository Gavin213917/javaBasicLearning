package com.gavin.set;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.TreeSet;

public class TreeSetDemo {

	static int age;
	static boolean mark;
	static float money;
	static char cc;
	public static void main(String[] args) throws ParseException {
		System.out.println(age);
		System.out.println(mark);
		System.out.println(money);
		System.out.println(cc);
		
		//TreeSet---红黑树算法--来维护元素的顺序---内置了一个排序器
		
		//TreeSet会调用集合中的一个方法叫conpareTo(Object o)的方法比较元素的大小关系，这种方式排序叫自然排序(升序),
		//如果你想你通过改变排序的规则，那么你可以自定一个类实现Comparator接口，覆盖compare方法的进行比较。
		//jdk为Comparator接口提供了一个默认排序机制：
		//1:八种封装数据类型和BigDecimal和BigInteger等都是根据数值的大小进行比较排序
		//2:Character,String会自动根据字符或者字符串的unicode值进行比较
		//3:Date，Time都是根据日期比较来进行排序
		
		//排序接口的构造函数
//		TreeSet<String> set =new TreeSet<>();
//		set.add("A");
//		set.add("B");
//		set.add("C");
//		set.add("H");
//		set.add("E");
//		set.add("F");
//		set.add("G");
		TreeSet<String> set =new TreeSet<>(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				if(o2.length()<o1.length()){
					return -1;
				}else{
					return 1;
				}
				
//				System.out.println(o2+"=="+o2.hashCode()+"<======>"+o1+"=="+o1.hashCode());
//				
//				if(o2.hashCode()>o1.hashCode()){
//					return -1;
//				}else{
//					return 1;
//				}
				
				//作业：根据字符串的首字母对应的ascii值进行排序
			}
		});
		
		set.add("java");
		set.add("w我爱你");
		set.add("w我是keke老师");
		set.add("n你哈吗23");
		set.add("w为为");
		set.add("a啊");
		set.add("o哦");
		
		
		
		
		for (String c: set) {
			System.out.println(c);
		}
		
		
		
		/*
		 * jdk--数值型和 布尔型
		 * 八种基础数据类型
		 * byte short int long 0
		 * float double  0.0
		 * char \u0000
		 * 0-48  A-65   a-97
		 * 
		 * 其他的都是null作为默认值(封装数据类型)
		 * 
		 * 
		 * boolean
		 * 
		 * 
		 * */
		
		
		
		TreeSet<Date> dates = new TreeSet<>(new DateComparator(false));
//		TreeSet<Date> dates = new TreeSet<>(new DateComparator());
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2017-12-12 12:12:11"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2015-08-12 01:12:08"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2014-03-12 11:12:12"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2012-02-12 01:12:10"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2012-10-12 01:12:10"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2016-12-12 02:11:22"));
		dates.add(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2015-11-12 11:12:24"));
		
		
		
		
		
//		for (Date date : dates) {
//			System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
//		}
		
		
		
		
		
		
		
		
		
	}
}