package com.gavin.io.base;

import java.io.*;

/**
 * @Author gaoming
 * @Description:符流和缓冲字符流的效率对比：
 * @测试多次，结果差不多，可见字符缓冲流效率上并没有明显提高，我们更多的是要使用它的readLine()和newLine()方法。
 * @Date 2021/1/27 11:32
 * @Param
 * @return
 **/
public class IoEfficiencyCompare3 {
	public static void main(String[] args) throws IOException {
		// 数据准备
		dataReady();

		File data = new File("C:/Mu/data.txt");
		File a = new File("C:/Mu/a.txt");
		File b = new File("C:/Mu/b.txt");
		File c = new File("C:/Mu/c.txt");

		long start = System.currentTimeMillis();
		copy(data, a);
		long end = System.currentTimeMillis();

		long start2 = System.currentTimeMillis();
		copyChars(data, b);
		long end2 = System.currentTimeMillis();

		long start3 = System.currentTimeMillis();
		bufferedCopy(data, c);
		long end3 = System.currentTimeMillis();

		System.out.println("普通字节流1耗时：" + (end - start) + " ms,文件大小：" + a.length() / 1024 + " kb");
		System.out.println("普通字节流2耗时：" + (end2 - start2) + " ms,文件大小：" + b.length() / 1024 + " kb");
		System.out.println("缓冲字节流耗时：" + (end3 - start3) + " ms,文件大小：" + c.length() / 1024 + " kb");
	}

	// 普通字符流不使用数组
	public static void copy(File in, File out) throws IOException {
		Reader reader = new FileReader(in);
		Writer writer = new FileWriter(out);

		int ch = 0;
		while ((ch = reader.read()) != -1) {
			writer.write((char) ch);
		}
		reader.close();
		writer.close();
	}

	// 普通字符流使用字符流
	public static void copyChars(File in, File out) throws IOException {
		Reader reader = new FileReader(in);
		Writer writer = new FileWriter(out);

		char[] chs = new char[1024];
		while ((reader.read(chs)) != -1) {
			writer.write(chs);
		}
		reader.close();
		writer.close();
	}

	// 缓冲字符流
	public static void bufferedCopy(File in, File out) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(in));
		BufferedWriter bw = new BufferedWriter(new FileWriter(out));

		String line = null;
		while ((line = br.readLine()) != null) {
			bw.write(line);
			bw.newLine();
			bw.flush();
		}

		// 释放资源
		bw.close();
		br.close();
	}

	// 数据准备
	public static void dataReady() throws IOException {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 600000; i++) {
			sb.append("abcdefghijklmnopqrstuvwxyz");
		}
		OutputStream os = new FileOutputStream(new File("C:/Mu/data.txt"));
		os.write(sb.toString().getBytes());

		os.close();
		System.out.println("完毕");
	}
}
