package com.gavin.stack;

public class StackDemo {

	/**
	 * 十进制转二进制 
	 * 方法名：toJinzhi 
	 * @param num
	 * @return String
	 * @exception 
	 *               
	 */
	public static String toJinzhi(int num) {
		StackTest stack = new StackTest(32);
		while (num > 0) {
			stack.push(num % 2);
			num = num / 2;
		}
		StringBuffer buffer = new StringBuffer();
		while (!stack.isEmpty()) {
			buffer.append(stack.pop());
		}
		return buffer.toString();
	}

	// 通用进制转换方法
	public static String baseConvert(int num, int base) {
		StackTest stack = new StackTest(32);
		while (num > 0) {
			stack.push(num % base);
			num = num / base;
		}
		// 1010
		String digts = "0123456789abcdef";
		String result = "";
		while (!stack.isEmpty()) {
			result += String.valueOf(digts.charAt((int) stack.pop()));
		}
		return result;
	}

	public static void main(String[] args) {
		// KeKeStack stack=new KeKeStack(5);
		// stack.push(0);
		// stack.push(1);
		// stack.push(0);
		// stack.push(1);
		//
		// while (!stack.isEmpty()) {
		// System.out.println(stack.pop());
		// }

		// String result = toJinzhi(132232);
		// System.out.println(result);

		// java java.util.Stack---Vector

		System.out.println(baseConvert(10, 2));
		System.out.println(baseConvert(10, 8));
		System.out.println(baseConvert(10, 16));

		System.out.println(Integer.toString(10, 2));
		System.out.println(Integer.toString(10, 8));
		System.out.println(Integer.toString(10, 16));

	}

}
