package com.gavin.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class ListDemo2 {

	public static void main(String[] args) {
		// ArrayList和Vector--动态数组,有序可重复的集合---索引来维护维护的位置

		// Set--HashSet---无序不可重复值的集合,它们是通过_hashchode 和_eqauls_判别是属于相同元素。iterator/foreach

		// List<Integer> nums = new ArrayList<>();// 10个长度数组
		// nums.add(1);
		// nums.add(2);
		// nums.add(3);
		// nums.add(4);
		// nums.add(5);
		// nums.add(6);
		// nums.add(7);
		// nums.add(8);
		// nums.add(9);
		// nums.add(10);// 扩展数组的长度，并且进行数组的拷贝

		// add(int index,Object element) 在指定的索引位置插入元素
//		nums.add(2, 5);// 插队
		// addAll(Collection c) 添加一个集合，在原来集合的尾部

		// addAll(int index,Collection c) 在指定的索引位置插入集合

		// nums.add(1,11);

		// List<Integer> nums2 = new ArrayList<>();
		// nums2.add(11);
		// nums2.add(12);
		// nums2.add(13);
		// nums.addAll(2, nums2);// 插入集合元素到位置索引为2也就是第三个元素开始插入

		// for (Integer integer : nums) {
		// System.out.println(integer);
		// }

		// get(int index)
		// System.out.println(nums.get(0));
		// System.out.println(nums.get(nums.size() - 1));
		// System.out.println(nums.get(1));

		// indexOf()返回索引位置判断元素是否存在集合中

		// lastIndexOf
		// set
		// subList

		// jdk1.8新增的集合List的方式
		// sort
		// replaceAll

		List<String> classrooms = new ArrayList<>();
		classrooms.add("异步");// 0

		classrooms.add("eden");// 1
		classrooms.add("努力");// 2
		classrooms.add("阿飞");// 3
		classrooms.add("简单就是美");// 4

		classrooms.add("阿飞");// 5
		classrooms.add("大帅");// 6
		classrooms.add("jamie");// 7
		classrooms.add("任");// 8
		classrooms.add("Boolean");// 9
		classrooms.add("小布丁");// 10
		classrooms.add("蚂蚁");// 11
		classrooms.add("阿飞");// 12

		for (String string : classrooms) {
			System.out.println(string + "同学==都在yy6359频道听keke老师讲课");
		}

		// volatile
		// transient

		// indexOf 返回元素所在的索引位置--从左向右查询,找到第一个直接返回
		// 判断一个元素是否存在集合中,存在返回索引位置，如果不存在返回-1
		// int index = classrooms.indexOf("阿飞");
		// int cindex = classrooms.lastIndexOf("阿飞");
		// System.out.println("老师我在教室【"+index+"】座位上");
		// System.out.println("老师我在教室【"+cindex+"】座位上");
		// System.out.println("sublist======================");
		//
		List<String> names2 = classrooms.subList(1, 5);// 相当于字符串中的substring, javascript=---substring相当于数组的slice
		for (String string : names2) {
			System.out.println("====" + string);
		}

		System.out.println("size=====" + classrooms.size());

		String string = "12345678";
		String str = string.substring(0, 3);
		System.out.println(str);

		System.out.println("==================sort=========================");

		// replaceAll
		classrooms.sort(new Comparator<String>() {

			// 根据字符串的首字母进行排序
			@Override
			public int compare(String o1, String o2) {
				if (o1.hashCode() > o2.hashCode()) {
					return -1;
				} else if (o1.hashCode() < o2.hashCode()) {
					return 1;
				} else {
					return 0;
				}
			}
		});

		for (String num : classrooms) {
			System.out.println("====" + num);
		}
	}

}
