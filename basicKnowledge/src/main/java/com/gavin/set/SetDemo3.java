package com.gavin.set;

import java.util.HashSet;
import java.util.Iterator;

public class SetDemo3 {

	public static void main(String[] args) {
		HashSet<Integer> ages = new HashSet<>();
		HashSet<Integer> ages2 = new HashSet<>();
		ages.add(10);
		ages.add(20);
		ages.add(30);
		ages.add(40);
//		ages.add(50);
		
//		//追加到一个新的set中
//		ages2.addAll(ages);
//		//jdk1.8中提供predicate(Filter),集合的条件的过滤
//		Iterator<Integer> it = ages.iterator(); 
//		while (it.hasNext()) {
//			Integer age =  it.next();
//			if(age.equals(20)){
//				ages.remove(age);
//			}
//			
//		}
		//以上代码代码会报java.util.ConcurrentModificationException
		//https://www.cnblogs.com/dolphin0520/p/3933551.html 解释
		//解决方案：重新创建一个set 集合对象，然后迭代新的，删除旧的
		//追加到一个新的集合中
//		ages2.addAll(ages);
//		Iterator<Integer> it = ages2.iterator(); 
//		while (it.hasNext()) {
//			Integer age =  it.next();
//			if(age.equals(20)){
//				ages.remove(age);
//			}
//			
//		}
		
//		ages.removeIf(age->age.equals(20));
//		ages.removeIf(age->age>20);
//		System.out.println("删除以后的元素是:");
//		for (Object age : ages) {
//			System.out.println(age);
//		}	
		
		
		
		System.out.println("删除以后的元素是:");
		HashSet<String> books = new HashSet<>();
		books.add("是的发送到发送到水电费");
		books.add("123");
		books.add("123456");
		books.add("是的地方");
		books.add("水电费水电费水电费");
//		books.removeIf(book->book.length()>5);
//		books.removeIf(book->book.indexOf("123")!=-1);
//		books.removeIf(book->book.startsWith("是"));
//		books.removeIf(book->book.endsWith("水电费"));
		books.removeIf(book->(book.contains("的") && book.endsWith("方")));
//		books.removeIf(book->(book.contains("的")));
		//把不包含的
		for (String string : books) {
			System.out.println(string);
		}
	}

}
