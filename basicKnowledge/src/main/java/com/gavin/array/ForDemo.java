package com.gavin.array;

public class ForDemo {

	public static void main(String[] args) {
		//多重循环---一般用于二维数组和多位数组
		/*
		 * 	for(int i=0;i<length;i++){
		 *    for(int j=0;j<length;j++){
		 *    	//循环体
		 *    }
		 *  }
		 * 
		 * */
		
		//外层循环只是控制内层循环的次数。
		for (int i = 1; i <=10; i++) {//外层循环
			
			for (int j = 1; j <=10; j++) {//内层循环
				//内层循环体
				System.out.println(i+"====>"+j);
			}
			//外层循环体
			System.out.println("============");
		}
		
	}
	public static void printMultiTable() {
		/*
		 * 1 * 1 = 1 	 1 
		 * 1 * 2 = 2  2 * 2 =4  2
		 * 1 * 3 = 3  2 * 3 = 6 3 * 3 = 9  3
		 * 
		 * 九九乘法不来看效果
		 * 但是跟重要要明白，这个知识点背后隐藏的知识--理解嵌套 for
		 * 外层控制内存循环的次数。
		 * */
		for (int i = 1; i <= 9; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(i + "*" + j + "=" + (i * j)+"\t");
			}
			System.out.println();
		}
	}
}