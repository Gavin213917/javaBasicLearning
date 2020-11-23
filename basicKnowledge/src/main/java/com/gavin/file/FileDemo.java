package com.gavin.file;

import java.io.File;
import java.text.ParseException;
import java.util.Date;

import com.gavin.string.StringUtils;

public class FileDemo {

	/**
	 * io是java.io包
	 * 
	 * java.lang java.util(日期处理+正则) 
	 * java.text 
	 * java.io 
	 * java.nio
	 * java.sql 
	 * java.awt 
	 * java.net 
	 * java.rmi 
	 * java.secrity
	 * 
	 * 
	 * 
	 * File类 我要向通过程序去读取一个文件的内容到程序中。
	 *  1:拿到文件/文件夹(目录)
	 * 2:操作文件(程序读取(InputStream)和程序写入(OutPutStream))
	 * 
	 * @throws ParseException
	 */

	public static void main(String[] args) throws ParseException {
		// 获取的d盘的文件
		File file = new File("D:/luoo.html");
//		File file = new File("gavin");
		// 获取文件夹(目录)
		File directory = new File("D:/长宁");

		// 基本方法
		print("文件的名称是:" + file.getName());
		print("文件的路径是:" + file.getPath());
		print("文件的绝对路径(全路径)是:" + file.getAbsolutePath());
		print("文件的所在的目录(文件夹):" + file.getParent());

		// 文件和目录检查相关的方法
		print("当前文件是否存在:" + (file.exists() ? "存在" : "不存在"));// true存在，不存在false
		print("当前是一个文件吗？" + (file.isFile() ? "是" : "不是"));
		print("当前是一个目录吗？" + (directory.isDirectory() ? "是" : "不是"));
		print("判断是不是一个绝对路径:" + file.isAbsolute());
		print("文件是否可读的：" + file.canRead());
		print("文件是否可写的：" + file.canWrite());
		print("文件是否隐藏的：" + file.isHidden());

		// 文件的目录附属信息
		print("文件的大小：" + file.length());
		print("文件的大小：" + StringUtils.countFileSize(file.length()));
		print("文件的大小：" + StringUtils.countFileSize("d:/luoo.html"));
		print("文件的大小：" + StringUtils.countFileSize(file));
		print("文件的大小：" + StringUtils.byteCountToDisplaySize(file.length()));
		print("文件的最后修改时间:" + file.lastModified());
		print("文件的最后修改时间:" + StringUtils.dateToString(new Date(file.lastModified()), "yyyy/MM/dd HH:mm"));

		// 文件和目录相关的一些操作
//		boolean createNewFile();
//		boolean delete();
//		boolean deleteOnExit();

		// 目录相关操作

	}

	private static void print(String message) {
		System.out.println(message);
	}

}
