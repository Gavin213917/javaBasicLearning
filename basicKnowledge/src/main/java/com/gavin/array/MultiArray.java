package com.gavin.array;

public class MultiArray {

	public static void main(String[] args) {
		// 二位数组
		int[][] agescrores = { { 20, 98 }, { 30, 96 }, { 40, 78 } };

		// int[] ages={20,30,40};
		// int[] scores={98,96,78};
		for (int i = 0; i < agescrores.length; i++) {
			int[] as = agescrores[i];// {20,98}
			System.out.println(as[0]);
			System.out.println(as[1]);
			for (int j = 0; j < as.length; j++) {
				System.out.print(as[j] + "\t");
			}

			System.out.println("");
		}

//		for (int i = 0; i < agescrores.length; i++) {
//			for (int j = 0; j < agescrores[i].length; j++) {
//				System.out.print(agescrores[i][j] + "\t");
//			}
//			System.out.println("");
//		}
	}

}
