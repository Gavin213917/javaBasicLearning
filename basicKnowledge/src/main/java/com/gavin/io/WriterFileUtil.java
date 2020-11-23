package com.gavin.io;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

public class WriterFileUtil {

	
	//以字节的方式写入文件中 boolean append 代表是追加还是覆盖
	public static void wirterFileBytes(String content,String fileName,boolean append){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
			FileOutputStream out = new FileOutputStream(fileName,append);
		){
			byte[] b = content.getBytes();
			out.write(b);
		} catch (Exception e) {
		}
	}
	
	//以字符的方式进行 写入
	public static void wirterFileChars(String content,String fileName,boolean append){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
//			FileOutputStream out = new FileOutputStream(fileName,append);
//			OutputStreamWriter writer = new OutputStreamWriter(out);
			FileWriter writer = new FileWriter(fileName,append);//等价于上面的两行，封装了	
		){
			writer.write(content);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//以行写入
	public static void wirterFileLine(String content,String fileName,boolean append){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
			FileOutputStream out = new FileOutputStream(fileName,append);
			OutputStreamWriter outwriter = new OutputStreamWriter(out);
			BufferedWriter writer = new BufferedWriter(outwriter);
		){
			writer.write(content);
			writer.newLine();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void wirterFileLines(String content,String fileName,boolean append){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
//			FileOutputStream out = new FileOutputStream(fileName,append);
//			OutputStreamWriter outwriter = new OutputStreamWriter(out);
//			BufferedWriter writer = new BufferedWriter(outwriter);
			//建立输出流  
			PrintWriter writer = new PrintWriter(new FileOutputStream(file, append));//相当于上面的三行，封装了
		){
			writer.println(content);
			writer.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
		String file = "c://test/a.txt";
//		wirterFileBytes("I",file,true);
//		wirterFileChars("\tLove ",file,true);
//		wirterFileLine("\tYou，\r\n我是keke老师，\r\n今年30岁\r\n我是一个老师!",file,true);
		
		wirterFileLines("白日依山尽，\r\n黄河入海流。\r\n欲穷千里目，\r\n更上一层楼。",file,false);
	}
}
