package com.gavin.map;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class List_javabean {

	
	public static void main(String[] args) {
		
		
		//把这个教室里面的一百同学，的姓名，年龄，性别，电话号码，身份证登记一下，然后去yy6359听keke老师讲课
		Student dawei=new Student();
		dawei.setUsername("大为");
		dawei.setAge(20);
		dawei.setTelephon("15895468464");
		dawei.setIdCard("234234234234");
		
		
		Student mayi=new Student();
		mayi.setUsername("鼠标");
		mayi.setAge(10);
		mayi.setTelephon("15489449843");
		mayi.setIdCard("234234234234");
		
		List<Student> students = new ArrayList<Student>();
		students.add(dawei);
		students.add(mayi);
		
		//排序
		students.sort(new Comparator<Student>() {
			@Override
			public int compare(Student o1, Student o2) {
				if(o1.getAge()>o2.getAge()){
					return -1;
				}else if(o1.getAge()<o2.getAge()){
					return 1;
				}else{
					return 0;
				}
			}
		});
	
		
		for (Student student : students) {
			System.out.println(student.getUsername()+"==="+student.getAge()+"来yy6359听课");
		}
		
		//List+javabean--会额外添加类
		
	
		
	}
}

