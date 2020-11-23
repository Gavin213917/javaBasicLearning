package com.gavin.set;

import java.util.TreeSet;

public class SetDemo5 {
	public static void main(String[] args) {
		// Integer---Object
		// 每一个对象它都有一个hashCode和toString()
		//
//		String keke = "是的都是sdfsdfs水电费";
//		// System.out.println(keke.hashCode());
//		System.out.println(keke.toString());
//		//
//		Float float1 = 1033.5f;
//		Float float2 = 1033.5f;
//		System.out.println(float1 == float2);// equals---hashcode比较 true---==是内存地址比较
//		System.out.println(float1.toString());
		//
		// //比较--一定是数值的比较---数值类型---对应的数字--才能比较

		// Student student=new Student();//
		// student.setUsername("keke");
		// student.setAge(30);
		// student.setScore(10);
		// System.out.println(student.toString());
		// System.out.println(student);

		// Set 无序，不允许重复---根据hashcode去比较两个元素是否不相同，如果相同会自动调用equals方法去比较，如果比较是true,自然过滤掉，
		// Set它允许存储null值

		// Set<Integer> nums = new HashSet<>();
		// nums.add(null);
		// nums.add(1);
		// nums.add(2);
		// nums.add(4);
		// for (Integer integer : nums) {
		// System.out.println(integer);
		// } 

		// Collection<Integer> sets1=new LinkedHashSet<>();
		//
		// Set<Integer> sets2=new LinkedHashSet<>();
		//
		// HashSet<Integer> sets3=new LinkedHashSet<>();

		// 不允许重复，有序的
		// Set<Integer> sets4 = new HashSet<>();
		// LinkedHashSet<Integer> sets4=new
		// LinkedHashSet<>();//链表来维护有序序列--性能要比hashset要差一些--多线程--任务分发

		// for (int i = 0; i < 100000; i++) {
		// sets4.add(i);
		// }

		// for (Integer integer : sets4) {
		// System.out.println(integer);
		// }

		// TreeSet---红黑树算法--来维护元素的顺序---内置了一个排序器

		// TreeSet会调用集合中的一个方法叫conpareTo(Object o)的方法比较元素的大小关系，这种方式排序叫自然排序(升序),
		// 如果你想你通过改变排序的规则，那么你可以自定一个类实现Comparator接口，覆盖compare方法的进行比较。
		// jdk为Comparator接口提供了一个默认排序机制：
		// 1:八种封装数据类型和BigDecimal和BigInteger等都是根据数值的大小进行比较排序
		// 2:Character,String会自动根据字符或者字符串的unicode值进行比较
		// 3:Date，Time都是根据日期比较来进行排序

		// 排序接口的构造函数
		TreeSet<Integer> set = new TreeSet<>(new IntegerComparator(false));
		set.add(1);
		set.add(12);
		set.add(11);
		set.add(10);
		set.add(8);
		set.add(7);
		// 从小到大默认排序
		System.out.println(set.comparator());// 打印你排序的类是什么

		for (Integer integer : set) {
			System.out.println(integer);
		}

	}

}
