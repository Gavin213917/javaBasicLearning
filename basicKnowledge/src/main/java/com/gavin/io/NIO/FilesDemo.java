package com.gavin.io.NIO;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class FilesDemo {

	
	public static void main(String[] args) throws IOException {
		/*
		 * Files 
		 * 
		 * */
		
		//读取
//		List<String> lines = Files.readAllLines(Paths.get("d://luoo.html"));
//		for (String string : lines) {
//			System.out.println(string);
//		}
		
		//写入
//		List<String> strings = new ArrayList<>();
//		strings.add("我");
//		strings.add("爱");
//		strings.add("你");
//		Files.write(Paths.get("f://aaa.txt"),strings,Charset.forName("UTF-8"));
		
//		String content = "我爱你";
//		Files.write(Paths.get("f://aaa.txt"),content.getBytes());
		
		
		
//		Files.copy(Paths.get("d://luoo.html"),new FileOutputStream("f://aaa.html"));
		Files.copy(Paths.get("d://ccccc.jpg"),new FileOutputStream("f://arry.jpg"));
	}
}
