package com.gavin.array.sorts;

public class MaxOrMinValue {
	
	public static void main(String[] args) {
		MaxValue();
		int[] nums = {18,39,36,45,17};
		//需求，找到当前数组中，最小的数值和它对应的索引
		int num=nums[0];//18
		int index=0;//0
		
		int i=1;
		while(i<nums.length){
//			if(num > nums[i]){ 最小值
			if(num < nums[i]){//最大值
				num=nums[i];
				index=i;
			}
			i++;
		}
		
		System.out.println(num+"==="+index);
	}
	
	/**
	 * 
	 * @Title:MaxValue
	 * @author:Gavin  
	 * @date: 2019年5月10日下午4:22:32 
	 * @Description:求一个数组中的最大值和对应的索引  
	 * @version 1.0
	 */
	public static void MaxValue() {
		int[] arr = { 1, 3, 6, 98, 0 };
		int index = 0;
		int max = arr[0];
		for (int i = 0; i < arr.length; i++) {
			if(max < arr[i]) {
				max = arr[i];
				index = i;
			}
		}
		System.out.println("最大值为："+ max + "  索引为："+index);

	}

}
