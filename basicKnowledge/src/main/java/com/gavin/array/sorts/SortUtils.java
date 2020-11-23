package com.gavin.array.sorts;

/**
 * 
* @ClassName: SortUtils  
* @Description:排序算法的积累  
* @author Gavin  
* @date 2019年5月10日  
*
 */
public class SortUtils {

	/**
	 * 
	 * @Title:main
	 * @author:Gavin  
	 * @date: 2019年5月10日下午4:25:31 
	 * @Description:测试函数    
	 * @version 1.0
	 */
	public static void main(String[] args) {
		int [] arr = RandomArray.randomArr(5, 20);
		//bubbleSort(arr);
		selectSort(arr);
	}
	/**
	 * 
	 * @Title:bubbleSort
	 * @author:Gavin  
	 * @date: 2019年5月10日下午4:26:46 
	 * @Description:冒泡排序    
	 * 把第一个元素与第二个元素比较，如果第一个比第二个大，则交换他们的位置。
	 * 接着继续比较第二个与第三个元素，如果第二个比第三个大，则交换他们的位置….
	 * @version 1.0
	 */
	public static int[] bubbleSort(int [] arr) {
		if(arr == null || arr.length<2) {
			return arr;
		}
		
		for (int i = 0; i < arr.length; i++) {//控制轮数
			for (int j = 0; j < arr.length-i-1; j++) {
				if (arr[j] > arr[j+1]) {
					int temp = arr[j];
					arr[j] = arr[j+1];
					arr[j + 1] = temp;
				}
			}
		}
		for (int k = 0; k < arr.length; k++) {
			System.out.print(arr[k] + "\t");
		}
		System.out.println();
		return arr;
		
	}
	
	/**
	 * 
	 * @Title:selectSort
	 * @author:Gavin  
	 * @date: 2019年5月13日下午3:23:34 
	 * @Description:选择排序    
	 * @version 1.0
	 */
	public static int[] selectSort(int [] arr) {
		for (int i = 1; i < arr.length; i++) {
			int min = 0;
			for (int j = 1; j <= arr.length-i; j++) {
				if(arr[j] > arr[min]) {
					min = j;
				}
			}
			int temp = arr[arr.length - i];
			arr[arr.length - i] = arr[min];
			arr[min] = temp;
		}
		for (int k = 0; k < arr.length; k++) {
			System.out.print(arr[k] + "\t");
		}
		System.out.println();
        return arr;
	}

}
