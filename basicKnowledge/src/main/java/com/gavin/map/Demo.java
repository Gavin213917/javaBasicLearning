package com.gavin.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Demo {
	public static <T> void main(String[] args) {

		// 集合---容器---装载数据类型
//		List<String> names = new ArrayList<>();
//		names.add("keke");
//		names.add("小任");
//		names.add("蚂蚁");
//		names.add("小白");
//		names.add("lee");
//
//		names.add("aa");// hashcode97+97=194
////		names.add("aa");//hashcode 
//		names.add("d^");// 100 +94==194

//		hashMap+hashcode+list的合成体

		// Set List他们都存储一类数据----一类事物所有特征的时候，显得有点力不从心
		// 解决方案：List+类(javabean)

		// Map ---HashMap--获取数据快速，存储能力方便，
		// key不允许重复--set维护关系--里面是通过一个entry对象维护key--value的关系。entry是链表的维护关系

		/*
		 * 
		 * map.put(key,value);添加元素 
		 * map.get(key 获取元素) 
		 * map.containsKey(key) 
		 * map.isEmpty()
		 * map.remove(key) 
		 * map.values() 
		 * map.entrySet() 
		 * map.keySet()
		  * 分配entry---key转成hashcode存在一个entry中，然后把entry用集合存储起来
		 * get(key),---key转成hashcode和name--在集合中去找entry有没有有返回引用调用getValue方法
		 * 
		 * 
		 */

		// List+HashMap(javabean)
		HashMap<String, Object> map=new HashMap<>();//Set+linkedList
//		LinkedHashMap<String, Object> map=new LinkedHashMap<>();//Set+linkedList
//		TreeMap<String, Object> map=new TreeMap<>();//Set+linkedList
		//System.out.println(map.isEmpty());//true
		map.put("name", "keke");
		map.put("age", 30);
		map.put("address", "湖南长沙");
//		System.out.println(map.isEmpty());//false
//		
////		map.remove("name");//删除key
////		System.out.println(map.containsKey("name"));
//		System.out.println(map.get("name"));//

		// values
//		Collection<Object> objects= map.values();
//		for (Object object : objects) {
//			System.out.println(object);
//		}
//		
//		//keys
//		Set<String> keys= map.keySet();
//		for (Object object : keys) {
//			System.out.println(object);
//		}

		// for循环map
		for(Map.Entry<String, Object> entry:map.entrySet()){
			System.out.println(entry.getKey()+"=="+entry.getValue());
		}

//		Set====HashSet LinkedHashSet TreeSet<E> enumset
//		Map====HashMap LinkedHashMap TreeMap<E> enummap

		// remove add set都可能随时会碰到数组扩容的临界点，进行频繁的内存数组的拷贝和覆盖操作。数据可能会丢失
		// ArrayList是线程不安全的。

//		for (String string : names) {
//			System.out.println(string);
//		}
	}
}
