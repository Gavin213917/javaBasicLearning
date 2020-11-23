package com.gavin.array;

public class PrintDemo {
	public static void main(String[] args) {
		//printMultiTable();
		//printSquare2();
		printTriangle();
	}

	/**
	 * 
	* @Title:printMultiTable
	* @author:Gavin  
	* @date: 2019年5月6日下午11:01:59 
	* @Description:九九乘法不来看效果但是跟重要要明白，这个知识点背后隐藏的知识--理解嵌套 for 外层控制内存循环的次数。
	* @param     
	* @return void    
	* @throws
	 */
	public static void printMultiTable() {
		for (int i = 1; i <= 9; i++) {
			for (int j = 1; j <= i; j++) {
				System.out.print(i + "*" + j + "=" + (i * j) + "\t");
			}
			System.out.println();
		}
	}

	/**
	 * 
	* @Title:printSquare
	* @author:Gavin  
	* @date: 2019年5月6日下午11:07:03 
	* @Description:打印正方形
	* @param       
	* @return void    
	* @throws
	 */
	//实心
	public static void printSquare() {
		for(int i=1;i<=5;i++) {
			for(int j=1;j<=5;j++) {
				System.out.print("*"+" ");
			}
			System.out.println();
		}
	}
	//空心
	public static void printSquare2() {
		for (int i = 0; i < 5; i++) {// 先确定是5行5列的正方形
			if (i > 0 && i < 4) {// 打印出中间的情况
				for (int j = 0; j < 5; j++) {
					if (j == 0 || j == 4) {// 第一和最后一列
						System.out.print("* ");
					} else if (j >= 1 && j <= 4) {// 中间三列
						System.out.print("  ");// 输出
					}

				}
			} else if (i == 0 || i == 4) {// 第一行和最后一行
				for (int k = 0; k < 5; k++) {
					System.out.print("* ");
				}
			}
			System.out.println("");
		}
	}
	/**
	 * 
	* @Title:printTriangle
	* @author:Gavin  
	* @date: 2019年5月8日下午5:56:46 
	* @Description:打印三角形 
	* @param       
	* @return void    
	* @throws
	 */
	public static void printTriangle() {
		for (int i = 0; i < 5; i++) {
			for (int j = 0; j <= i; j++) {
				System.out.print(" *");
			}
			System.out.println();
		}
	}
}
