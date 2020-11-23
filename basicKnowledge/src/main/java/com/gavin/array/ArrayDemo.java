package com.gavin.array;

public class ArrayDemo {

	public static void main(String[] args) {
		// 循环--数组----char[] 数组---

		// 容器---装很多的东西--各种
		// 数组---容器---具体的一类数据类型的容器而已.
		// 数组 的定义有两种方式---静态定义和动态定义
		// 1.静态初始化
		// String[] names = {"小白","stone","小老鼠","老实","小辰","the end"};
		// String names01[] = new String[]{"小白","stone","小老鼠","老实","小辰","the end"};

		// 获取元素
		// System.out.println(names[0]);
		// System.out.println(names[2]);
		// System.out.println(names[names.length-1]);

		// 2.动态初始化---如果你业务里面。能够预测你容器的大小

		// String[] name02 = new String[6];
		// name02[0]="小白";
		// name02[1]="stone";
		// name02[2]="小老鼠";
		// name02[3]="老实";
		// name02[4]="小辰";
		// name02[5]="the end";
		// name02[5]=null;
		// name02[6]="23";//java.lang.ArrayIndexOutOfBoundsException: 6

		// 剩下的54只是根据你前面的数据类型的默认值进行填充:null


		

		// 2.封装数据类型数组 Byte Short Integer Long Float Double Boolean Character
		// ,如果空间足够，他们默认都是null

		// 3.对象数组 Person[] User[] String[] 如果空间足够，他们默认都是null

		int a1 = 20;
		int a2 = 21;
		int a3 = 22;
		int a4 = 23;
		// int[] ages ={a1,a2,a3,a4};
		Integer[] ages2 = { a1, a2, a3, a4 };
		int[] ages = new int[60];
		ages[0] = a1;
		ages[1] = a1;
		ages[2] = a1;
		ages[3] = a1;

		// String[] students ={"keke","张三","李四"};

		// 1:数组：是一个引用数据类型
		// 2:数组长度：.length（属性）
		// 3:数组如果一旦被定义，长度固定。就不能动态添加元素，删除元素，只能修改现有索引位置对应的元素.

		// 静态初始化
		String[] names = { "小白", "stone", "小老鼠", "老实", "小辰", "the end" };
		// System.out.println(names[0]+"==同学在yy6359听keke老师讲课javase课程");
		// System.out.println(names[1]+"==同学在yy6359听keke老师讲课javase课程");
		// System.out.println(names[2]+"==同学在yy6359听keke老师讲课javase课程");
		// System.out.println(names[3]+"==同学在yy6359听keke老师讲课javase课程");
		// System.out.println(names[4]+"==同学在yy6359听keke老师讲课javase课程");
		// System.out.println(names[5]+"==同学在yy6359听keke老师讲课javase课程");

		// 循环====在某种程度上来说就是服务数组的，没有数组循环其实是没意义的。
		// for (int i = 0; i < names.length; i++) {
		// System.out.println(names[i]+"==同学在yy6359听keke老师讲课javase课程");
		// }

		// 理解循环 for
		/*
		 * 格式: for(初始值1;逻辑判断2;自增变量3){ //循环体 4 }
		 * 
		 * 第1次循环完毕以后===1--->2---4---3 
		 * 第2次循环：2 --- 4 ---3 
		 * 第3次循环：2 --- 4 ---3 
		 * 第4次循环：2 ---4 ---3 
		 * 循环结束取决于 2是true还是false 如果是false就结束，
		 * 
		 */
//		for (int i = 0; i < 11; i++) {// 1...10会打印吗？ no 1--9
//			System.out.println(i);
//		}
		
		//1,2,3,4,5,6,7,8,9,10
//		int i = 1;
//		for (; i < 11; i++) {// 打印多少？？有坑。。。。
//			System.out.println(i);
//		}
		
		//11
		int i = 1;
		for (; i < 11; i++); {// 打印多少？？有坑。。。。
			System.out.println(i);
		}

	}

}