package com.gavin.lambda.s4;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Iterator;

public class LambdaInnerInterface {

	
	
	public static void main(String[] args) {
		
		Integer[] nums = {1,5,9,7,2,1,78,8,55};
//		Arrays.sort(nums, new Comparator<Integer>() {
//			@Override
//			public int compare(Integer o1, Integer o2) {
//				return o2-o1;
//			}
//		});
		Arrays.sort(nums, (o1,o2)->o2-o1);
		
		for (Integer integer : nums) {
			System.out.print(integer+"\t");
		}
		
	}
}
