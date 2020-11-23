package com.gavin.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListDemo {

	public static void main(String[] args) {
//		List---接口
		
		//List都有序，有重复的集合.它的实现原理一个动态数组，---数组--它有索引，
		//默认初始长度的10,每天调用add方法如果超过10个，数组原来长度的1.5倍进行扩展。
		

		//过程重复元素有要排序---treeset
		//过滤元素--hashset
		
		
		//List<Integer> nums=new ArrayList<>();//允许添加多个null
//		for (int i = 0; i < 10000; i++) {
//			nums.add(i);
//		}
//		LinkedHashSet<Integer> nums=new LinkedHashSet<>();//去重
		//Object[]
//		nums.add(1);
//		nums.add(2);
//		nums.add(3);
//		nums.add(4);
//		nums.add(5);
//		nums.add(6);
//		nums.add(7);
//		nums.add(8);
//		nums.add(9);
//		nums.add(10);//object[] 一定要初始
//		nums.add(11);//size++
//		nums.add(12);//15
//		nums.add(13);//15
//		nums.add(14);//15
//		nums.add(15);//15
//		nums.add(16);//21
//		nums.add(17);//21
//		nums.add(18);//21
//		nums.add(19);//21
//		nums.add(20);//21
//		nums.add(21);//21
		
		
//		System.out.println(nums.size());
//		for (Integer integer : nums) {
//			System.out.println(integer);
//		}
		
//		System.out.println(10>>1); //数组是堆里分配内存空间--
		
		Integer[] nums2 = {1,2,3,4,5,6,7,8,9,10};
		int len=15;
		Integer[] nums3= Arrays.copyOf(nums2, 4);//快速将一个数组的元素拷贝成为一个新的数组对象，并且初始化长度
		
		System.out.println(nums3.length);
		
		//不重复随机数
		//
	}

}
