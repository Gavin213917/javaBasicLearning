package com.gavin.io.NIO;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathsDemo {

	
	public static void main(String[] args) throws IOException {
		
		
//		Path path = Paths.get("d:/a/bbbb.txt");
		Path path = Paths.get("d:","tomcat7","敏感词库");
		System.out.println("拿到目录的深度："+path.getNameCount());
		System.out.println("获取根目录:"+path.getRoot());
		System.out.println("获取绝对路径："+path.toAbsolutePath());
		System.out.println(path.getFileName());
	}
}
