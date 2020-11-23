package com.gavin.io.NIO;

import java.io.File;
import java.io.IOException;
import java.nio.IntBuffer;
import java.util.List;

import org.apache.commons.io.FileUtils;

public class CommonIoTest {

	
	public static void main(String[] args) throws IOException {
//		String sizeString = FileUtils.readFileToString(new File("d://luoo.html"), "utf-8");
//		System.out.println(sizeString);
//		FileUtils.copyDirectory(new File("G:/Java基础班视频/JavaNio/a"), new File("G:/Java基础班视频/JavaNio/b"));
		
		
		//commons-fileupload.jar---依赖 commons-io-.jar
		List<String> html  = FileUtils.readLines(new File("d://luoo.html"), "utf-8");
		for (String string : html) {
			System.out.println("=========>"+string);
		}
		
	}
}
