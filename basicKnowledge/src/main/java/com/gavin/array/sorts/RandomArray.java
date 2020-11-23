package com.gavin.array.sorts;

import java.util.Random;

/**
 * 
 * @ClassName: RandomArray
 * @Description: TODO(生成随机数组)
 * @author Gavin
 * @date 2019年5月10日
 *
 */
public class RandomArray {
	/**
	 * 
	 * @Title:main
	 * @author:Gavin
	 * @date: 2019年5月10日上午9:46:45
	 * @Description:test
	 * @version 1.0
	 */
	public static void main(String[] args) {
		int[] arr = randomArr(5, 5);
		for (int i : arr) {
			System.out.print(i + "\t");
		}
	}

	/**
	 * 
	 * @Title:randomArr
	 * @author:Gavin
	 * @date: 2019年5月10日上午9:46:34
	 * @Description: 生成随机数组
	 * @version 1.0
	 */
	public static int[] randomArr(int len, int range) {
		Random random = new Random();
		int[] arr = new int[len];

		for (int i = 0; i < arr.length; i++) {
			arr[i] = random.nextInt(range);
		}
		return arr;

	}
}
