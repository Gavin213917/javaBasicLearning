package com.gavin.file;

import java.io.File;
import java.io.IOException;

public class FileDemo2 {

	public static void main(String[] args) throws IOException {
		// 获取的d盘的文件
		File file = new File("D:/luoo2.html");
		// 覆盖,如果已经有了就覆盖
		if (!file.exists()) {
			file.createNewFile();// 当File对象对应的文件不存在时，该方法就会创建一个文件，否则返回false,不创建
			System.out.println("创建文件成功" + file.getAbsolutePath());
		} else {
			System.out.println("已经存在了....");
		}

		// 删除文件
		if (file.exists()) {// 如果存在，删除
			file.delete();// 文件打开，或者占用的时候，删不了
			System.out.println("文件删除成功");
//			file.deleteOnExit();//注册一个删除钩子，只有当java虚拟机退出的时候，才会删除
		}

	}

	private static void print(String message) {
		System.out.println(message);
	}

}
