package com.gavin.io.charIO.reader;

import java.io.FileWriter;
import java.io.IOException;
import java.io.StringReader;

public class StringReaderDemo {

	
	public static void main(String[] args) {
		
		//字符流(输入流)
		/*
		 * Reader:--
		 * @see FileReader 是 InputStreamReader的子类，重构inputStream的方式，简化定义而已
		 * @see InputStreamReader  可以指定编码
		 * @see StringReader 是处理字符串相关操作
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

		String content = "我爱你";
		try (
			StringReader reader = new StringReader(content);
//			StringWriter writer = new StringWriter();
			FileWriter writer = new FileWriter("d://aaa.txt");	
		){
			char[] c = new char[128];
			int len = 0;
			while((len=reader.read(c))!=-1){
				writer.write(c, 0, len);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
