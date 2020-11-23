package com.gavin.io.charIO.reader;

import java.io.File;
import java.io.IOException;

public class FileReaderDemo {

	
	public static void main(String[] args) {
		
		//字符流(输入流)
		/*
		 * Reader:--
		 * @see FileReader
		 * @see InputStreamReader  可以指定编码
		 * @see StringReader
		 * 
		 * 
		 * @see BufferedReader--都是对字符流的一个缓冲
		 * 
		 * @see LineNumberReader
		 * @see CharArrayReader
		 * @see FilterReader
		 * @see PushbackReader
		 * @see PipedReader
		 * 
		 * 字节流
		 * int read()
		 * int read(byte[] b)
		 * int read(byte[] b,int off,int len)
		 * 字符流
		 * int read()
		 * int read(char[] b)
		 * int read(char[] b,int off,int len)
		 * 
		 */

		File file = new File("d://luoo.html");
		if(!file.exists()){
			System.out.println("文件不存在...");
			return;
		}
		
		try (
//			FileReader reader = new FileReader(file);
			KeKeFileReader reader = new KeKeFileReader(file, "utf-8");
		){
			char[] c = new char[128];
			int len = 0;
			while((len=reader.read(c))!=-1){
				System.out.println(new String(c,0,len));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
