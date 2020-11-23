package com.gavin.io.charIO.writer;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class BufferedWriterDemo {

	
	public static void main(String[] args) {
		
		//字符流(输入流)
		/*
		 * Writer:--
		 * @see   BufferedWriter
		 * @see   OutputStreamWriter
		 * @see   FileWriter
		 * @see   StringWriter
		 * @see   PrintWriter--jsp浏览器输出流 reponse.getWriter()
		 * 
		 * 
		 * 
		 * @see   CharArrayWriter
		 * @see   FilterWriter
		 * @see   PipedWriter
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
		
		//输出流--另存为
		File file2 = new File("e://luoo2.html");
		
		try (
			//输入流
			//字节流--文本文件
			FileInputStream	in = new FileInputStream(file);
			//建立输入流--转换流 -字节流---转换成--字符流
			InputStreamReader isr = new InputStreamReader(in,"UTF-8");
			//缓存流--数据数据缓冲的作用，高效运行--可以一行读取
			BufferedReader reader = new BufferedReader(isr);
				
			
			//输出流 不追加
//			FileOutputStream out = new FileOutputStream(file2);
//			OutputStreamWriter outwriter = new OutputStreamWriter(out, "UTF-8");
				
//			KeKeFileWriter fileWriter = new KeKeFileWriter(file2, "UTF-8");				
				
				
//			追加的内容	
//			FileOutputStream out = new FileOutputStream(file2,true);//追加内容
//			OutputStreamWriter outwriter = new OutputStreamWriter(out, "UTF-8");
				
//			KeKeFileWriter fileWriter = new KeKeFileWriter(file2, "UTF-8",true);//追加内容
//			
			//缓冲流	
//			BufferedWriter writer = new BufferedWriter(fileWriter);
				
			PrintWriter writer = new PrintWriter(file2);
		){
			String line = null;
			while((line=reader.readLine())!=null){//如果文件读取完毕以后就返回null,返回还内容没有读取完毕
				if(!line.trim().equals("")){
					writer.write(line+"\n");
				}
			}
			//强刷字节到内容中
			writer.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}