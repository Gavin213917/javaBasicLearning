package com.gavin.io.charIO.reader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class BufferedReaderDemo {

	
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
			//字节流--文本文件
			FileInputStream	in = new FileInputStream(file);
			//建立输入流--转换流 -字节流---转换成--字符流
			InputStreamReader isr = new InputStreamReader(in,"UTF-8");
			//缓存流--数据缓冲的作用，高效运行--可以一行读取
			BufferedReader reader = new BufferedReader(isr);
		){
			
			String line = null;//
			
			while((line=reader.readLine())!=null){//如果文件读取完毕以后就返回null,返回还内容没有读取完毕
				if(!line.trim().equals("")){
					System.out.println(line);
				}
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	//序列化创建对象  任意访问文件和读取位置  文件分割和合并       
}
