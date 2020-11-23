package com.gavin.set;

import java.util.HashSet;

public class SetDemo {
	public static void main(String[] args) {
		/**
		 * Collection顶级接口中：
		 * Collection接口是List和Set和Queue接口的父接口，该接口即可以操作Set集合也可以用于操作List和Queue集合，其中通用的方法如下：
			boolean add(Object o) ：为集合添加元素，如果被添加到集合中改变集合的长度，添加成功返回true;
			boolean addAll(Collection c) 该方法把集合c里所有的元素添加到指定的集合里。
			void clear():清空集合，长度变0.
			boolean contains(Object c):判断元素是否在集合中。
			boolean containsAll(Collection c):判断某集合是否包含另外一个集合所有的元素，如果是返回:true
			boolean isEmpty();判断集合是否为空，如果size=0;返回true否则false.
			Iterator iterator()返回一个迭代对象，用于遍历集合里的元素。
			boolean remove(Object c);根据某个元素从集合中删除。改变长度
			boolean removeAll(Collection c);删除一个集合中在另外一个集合中的所有元素。如果删除有一个或者多个返回true;否则false;
			boolean retainAll(Collection c);从集合中删除集合c里不包含的元素，--取 两个集合的交集，如果不同的删除
			int  size();获取集合的长度
			object[] toArray() 该方法把一个集合快速的转换成数组。
		 * 
		 * Set子元素有一个特征：不允许出现相同的元素，里面进行过滤，每次执行是无序进行存储. 里面叫hashcode--
		 * 
		 * Set它不是用数组来封装，它区别后面要讲的一个List 因为List是用数组来封装的
		 * 
		 */
		Integer keke_age = 30;
		HashSet<Student> ages = new HashSet<>();

		Student keke = new Student("keke", 30);// hashcode=111
		Student xiaohuang = new Student("xiaohuang", 21);// hashcode=1

		Student mayi = new Student("keke", 30);// hashcode=1
		Student stone = new Student("stone", 20);// hashcode=1
		
		//每次添加都会调用hashcode和eqauls方法，如果他们hashcode的值是相同，那么就直接不会在追加进去的。返回false
		boolean c1 = ages.add(keke);// 61
		boolean c2 = ages.add(xiaohuang);// 52
		boolean c3 = ages.add(mayi);// 51
		boolean c4 = ages.add(stone);// 51

		System.out.println(c1);// hashcode
		System.out.println(c2);
		System.out.println(c3);// false
		System.out.println(c4);

		for (Student student : ages) {
			System.out.println(student.getUsername() + "===" + student.getAge());
		}

		System.out.println("keke".hashCode());

		// 总结在未来开发过程中，只要牵涉元素的过滤和去重---都想到set---HashSet

	}

}
