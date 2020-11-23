package com.gavin.file;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;

import com.gavin.string.StringUtils;

public class FileDemo3 {

	public static void main(String[] args) throws IOException {
		File directory = new File("D:/我的网页/chapter01/a/b");// 255级
		// 文件的目录附属信息
		print("目录的最后修改时间:" + directory.lastModified());
		try {
			print("目录的最后修改时间:" + StringUtils.dateToString(new Date(directory.lastModified()), "yyyy/MM/dd HH:mm"));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		// 目录的创建
		if (!directory.exists()) {
//			directory.mkdir();//创建单目录
			directory.mkdirs();//创建多目录
		}

	}

	private static void print(String message) {
		System.out.println(message);
	}

}
