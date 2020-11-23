package com.gavin.array;

import java.util.Scanner;

public class QuestionAccumulate {

	/**
	 * 求最大公约数（greatest common divisor）
	 * 
	 * @Title:gcd
	 * @author:Gavin
	 * @date: 2019年5月18日下午6:28:08
	 * @Description:TODO
	 * @version 1.0
	 */
	public static void gcd() {
		Scanner scan = new Scanner(System.in);
		System.out.println("please input num1");
		int num1 = scan.nextInt();
		System.out.println("please input num2");
		int num2 = scan.nextInt();
		int i = num1 > num2 ? num2 : num1;
		while (i >= 1) {
			if (num1 % i == 0 && num2 % i == 0) {
				System.out.println(i);
				break;
			}
			i--;
		}

	}

	/**
	 * 打印星星
	 * 
	 * @Title:printStar
	 * @author:Gavin
	 * @date: 2019年5月18日下午6:38:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static void printStar() {
		for (int i = 1; i < 6; i++) { // 外循环控制行数
			// for(int j=5;j>=i;j--)
			for (int j = i; j < 6; j++) { // 内循环控制每行打印的*数
				System.out.print("*");

			}
			System.out.println();
		}

	}

	/**
	 * 打印星星
	 * 
	 * @Title:printStar
	 * @author:Gavin
	 * @date: 2019年5月18日下午6:38:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static void printStar2() {
		for (int x = 1; x <= 5; x++) {
			for (int y = 5; y > x; y--) {
				System.out.print(" ");

			}
			for (int z = 1; z <= x; z++) {
				System.out.print("*");
			}
			System.out.println();
		}
	}

	/**
	 * 打印星星
	 * 
	 * @Title:printStar
	 * @author:Gavin
	 * @date: 2019年5月18日下午6:38:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static void printStar3() {
		for (int x = 1; x <= 9; x += 2) {
			for (int y = 1; y < x; y += 2) {
				System.out.println(" ");
			}
			for (int z = x; z <= 9; z++) {
				System.out.print("*");
			}

		}
		System.out.println();
	}

	/**
	 * 测试函数
	 * 
	 * @Title:main
	 * @author:Gavin
	 * @date: 2019年5月18日下午6:26:44
	 * @Description:TODO
	 * @version 1.0
	 */
	public static void main(String[] args) {
		// gcd();
		// printStar3();

	}

}
