package com.gavin.io.charIO.reader;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class InputStreamReaderDemo {

	
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
//		FileInputStream in = null;//字节流
//		InputStreamReader isr = null;//转换流
//		try {
//			File file = new File("d://luoo.html");
//			if(!file.exists()){
//				System.out.println("文件不存在...");
//				return;
//			}
//			
//			//字节流--文本文件
//			in = new FileInputStream(file);
//			//建立输入流--转换流 -字节流---转换成--字符流
//			isr = new InputStreamReader(in,"UTF-8");
//			char[] c = new char[128];
//			int len = 0;
//			while((len=isr.read(c))!=-1){
//				System.out.println(new String(c,0,len));
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		} finally {
//			try {
//				if(isr!=null)isr.close();
//				if(in!=null)in.close();
//			} catch (IOException e2) {
//				e2.printStackTrace();
//			}
//		}
		
		File file = new File("d://luoo.html");
		if(!file.exists()){
			System.out.println("文件不存在...");
			return;
		}
		//jdk 1.7 之后像这样写，就不用关闭流了，它会自动关闭，实现了Closeable 接口
		try (
			//字节流--文本文件
			FileInputStream	in = new FileInputStream(file);
			//建立输入流--转换流 -字节流---转换成--字符流
			InputStreamReader isr = new InputStreamReader(in,"UTF-8");	
		){
			
			char[] c = new char[128];
			int len = 0;
			while((len=isr.read(c))!=-1){
				System.out.println(new String(c,0,len));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
