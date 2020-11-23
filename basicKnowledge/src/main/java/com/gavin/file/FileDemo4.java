package com.gavin.file;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileDemo4 {
	private static List<File> files = new ArrayList<>();


	public static void main(String[] args) throws IOException {
		File directory = new File("D:/长宁");// 255级
//		String[] files = directory.list();//既可以拿到文件也可以拿到文件夹

//		List<File> list = listFiles(directory);
		List<File> list = listFiles(new ArrayList<File>(), directory);
		for (File file : list) {
			System.out.println(file);
		}

		String[] files = directory.list();
//		for (String string : files) {
//			System.out.println(string);
//		}

		System.out.println("拿到文件列表的个数:" + files.length);

	}

	
	/**
	 * 利用全局变量的方式
	 * @Title: listFiles 
	 * @author: Gavin
	 * @time: 2019年7月1日 下午6:53:27
	 * @param directory
	 * @return 
	 * @return: List<File> 
	 * @throws
	 */
	public static List<File> listFiles(File directory) {
		File[] files2 = directory.listFiles();
		for (File file : files2) {
			if (file.isFile()) {
				files.add(file);
			}
			if (file.isDirectory()) {// 如果是目录，继续调用自己
//				files.add(file);//拿目录
				listFiles(file);
			}
		}

		return files;
	}

	/**
	  *  传参的方式
	 * @Title: listFiles 
	 * @author: Gavin
	 * @time: 2019年7月1日 下午6:53:35
	 * @param files
	 * @param directory
	 * @return 
	 * @return: List<File> 
	 * @throws
	 */
	public static List<File> listFiles(List<File> files, File directory) {
		File[] files2 = directory.listFiles();
		for (File file : files2) {
			if (file.isFile()) {
				files.add(file);
			}
			if (file.isDirectory()) {// 如果是目录，
//				files.add(file);
				listFiles(files, file);
			}
		}

		return files;
	}

	private static void print(String message) {
		System.out.println(message);
	}

}
