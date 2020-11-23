package com.gavin.map;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

public class List_hashMap {

	
	public static void main(String[] args) {
		
//		java.sql--操作数据库
		
		//把这个教室里面的一百同学，的姓名，年龄，性别，电话号码，身份证登记一下，然后去yy6359听keke老师讲课
//		Student dawei=new Student();
//		dawei.setUsername("大为");
//		dawei.setAge(20);
//		dawei.setTelephon("15895468464");
//		dawei.setIdCard("234234234234");
		HashMap<String,Object> dawei=new HashMap<>();
		dawei.put("username", "大为");
		dawei.put("age", 20);
		dawei.put("telephone", "15895468464");
		dawei.put("idcard", "32464234678674");
		
		
		
		HashMap<String,Object> mayi=new HashMap<>();
		mayi.put("username", "蚂蚁");
		mayi.put("age", 17);
		mayi.put("telephone", "1789687897");
		mayi.put("idcard", "35464654546");
		
		List<HashMap<String, Object>> students = new ArrayList<HashMap<String, Object>>();
		students.add(dawei);
		students.add(mayi);
		
		//排序
		students.sort(new Comparator<HashMap<String, Object>>() {
			@Override
			public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
				Integer age1=(Integer)o1.get("age"); 
				Integer age2=(Integer)o2.get("age"); 
				if(age1>age2){
					return 1;
				}else if(age1<age2){
					return -1;
				}else{
					return 0;//两个相同的情况就是0，代表不排序
				}
			}
		});
	
		
		for (HashMap<String, Object> student : students) {
			System.out.println(student.get("username")+"==="+student.get("age")+"来yy6359听课");
		}
		
		
		
//		List+HashMap
//		HashMap=====javabean
//		bean---map之间的转换的问题
		
//		Map---JavaBean--数据库中的表是什么关系	
		
		
	}
}
