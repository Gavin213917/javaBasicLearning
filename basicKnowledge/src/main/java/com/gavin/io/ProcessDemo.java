package com.gavin.io;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcessDemo {

	/**
	 * RandomAccessFile:任意访问
	 * 由于RandomAccessFile可以自由的访问文件的任意位置，所有如果只需要访问文件的部分内容，
	 * 而不是把文件从头读到尾，使用RandomAccessFile将是更好的选择。
	 * 
	 * 
	 */
	public static void main(String[] args) {
		try {
			Process process = Runtime.getRuntime().exec("java");
			BufferedReader br = new BufferedReader(new InputStreamReader(process.getErrorStream(),"gbk"));
			String string = null;
			while ((string=br.readLine())!=null) {
				System.out.println(string);
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
