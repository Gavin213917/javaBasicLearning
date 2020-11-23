package com.gavin.array;

public class YangHuiTriangle {
	/**
	 * 
	 * 
	 * 数组题目---杨辉三角
	 * 
	 * 1  [1]	 
	 * 1 1	[2]		
	 * 1 2 1 [3]
	 * 1 3 3 1 [4]
	 * 1 4 6 4 1 [5]
	 * 1j=0 5j=1 10j=2 10 j=3 5 1 [6]  i=5
	 * 1j=0 6j=1 15j=2 20 15 6 1 [7] 推一行 i=6
	 * 
	 * 杨辉三角 : 两侧是1 中间的内容是由元素的正上方的数值与左上方的数值相加
	 *  
	 */
	public static int[][] printYangHuiTriangle(int len) {
		int[][] nums = new int[len][];
		for (int i = 0; i < nums.length; i++) {// 控制有多少行，控制轮数
			nums[i] = new int[i + 1];// 开辟空间地址--数组不理解,循环给每个数组赋值,数组长度都不固定的，
			for (int j = 0; j < nums[i].length; j++) {
				if (i == 0 || j == 0 || j == nums[i].length - 1) {
					nums[i][j] = 1;
				} else {
					nums[i][j] = nums[i - 1][j] + nums[i - 1][j - 1];
				}
				System.out.print(nums[i][j] + "\t");
			}
			System.out.println("");
		}
		return nums;
	}
	
	/**
	 * 
	* @Title:main
	* @author:Gavin  
	* @date: 2019年5月9日下午4:20:23 
	* @Description:测试函数    
	* @version 1.0
	 */
	public static void main(String[] args) {
		printYangHuiTriangle(5);
	}
}
