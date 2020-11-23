package com.gavin.set;

import java.util.HashSet;
import java.util.Iterator;

public class SetDemo2 {

	public static void main(String[] args) {
		HashSet<Student> students = new HashSet<>();

		Student keke = new Student("keke", 30);// hashcode=111
		Student xiaohuang = new Student("xiaohuang", 21);// hashcode=1
		Student mayi = new Student("mayi", 30);// hashcode=1
		Student stone = new Student("stone", 20);// hashcode=1
		Student marlon2 = new Student("marlon", 10);

		students.add(keke);// 61
		students.add(xiaohuang);// 52
		students.add(mayi);
		students.add(stone);
		students.add(marlon2);

		HashSet<Student> students2 = new HashSet<>();
		Student marlon = new Student("marlon", 10);
		Student xiaomao = new Student("xiaomao", 40);
		students2.add(marlon);
		students2.add(xiaomao);

		// 将另外一个集合塞入集合中
		students.addAll(students2);
		// students.removeAll(students2);

		// students.retainAll(students2);

		// System.out.println("清空之前===="+students.size());
		// students.clear();
		// System.out.println("清空之后===="+students.size());

		// students.remove(marlon);
		/// 转数组
		// Object[] students3 = students.toArray();
		// for (int i = 0; i < students3.length; i++) {
		// Student student= (Student) students3[i];
		// System.out.println(student.getUsername()+"==="+student.getAge());
		// }

//		System.out.println("=================foreach==================");
//		students.removeIf(student -> student.getAge() > 20);
//		// 增强foreach
//		for (Student student : students) {
//			print(student);
//		}

		// System.out.println("===============while+iterator====================");
		// //while循环
		// Iterator<Student> iterator = students.iterator();
		// while(iterator.hasNext()){
		// Student student = iterator.next();
		// print(student);
		// }
		//
		// System.out.println("===============for====================");
		// //for循环
//		 for(Iterator<Student> iterator2 = students.iterator();iterator2.hasNext();){
//		 Student student = iterator2.next();
//		 print(student);
//		 }
		
		 
		
		//
		// System.out.println("===============for====================");
		// Iterator<Student> iterator3 = students.iterator();
		// for (; iterator3.hasNext();) {
		// Student student = iterator3.next();
		// print(student);
		// }

		// System.out.println("=================lambda==================");
		// lambda表达的集合循环方式
		 //students.forEach(student->print(student));
		 //students.forEach(student->print(student));
	}

	public static void print(Student student) {
		System.out.println(student.getUsername() + "==" + student.getAge());
	}

}
