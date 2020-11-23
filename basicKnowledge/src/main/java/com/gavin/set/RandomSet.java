package com.gavin.set;

import java.util.HashSet;
import java.util.Random;
import java.util.TreeSet;

public class RandomSet {

	/**
	 * 产生不重复的的随机数
	 * @Title:getRandomNum
	 * @author:Gavin  
	 * @date: 2019年5月21日上午9:18:13 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static Integer[] getRandomNum(int size, int rangeNum) {
		if (rangeNum < size)
			rangeNum += (size - rangeNum);
		//HashSet<Integer> nums2 = new HashSet<>();//无序的，去重过滤
		TreeSet<Integer> nums = new TreeSet<>();//排序的，去重过滤
		Random random = new Random();
		int i = 0;
		while (i < size) {
			boolean flag = nums.add(random.nextInt(rangeNum) + 1);// 返回false就代表元素已经存在，存在就不添加
			if (flag) {
				i++;
			}
		}

		Integer[] nums2 = new Integer[size];
		nums.toArray(nums2);//转成数组
		return nums2;
	}

	public static void main(String[] args) {

		/*
		 * 案例：生成不重复的随机数
		 * 
		 */

		// HashSet<Integer> nums=new HashSet<>();

		Integer[] nums = getRandomNum(10, 100);
		for (Integer integer : nums) {
			System.out.println(integer);
		}

	}

}
