package com.gavin.io;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

public class ReaderFileUtil {

	
	//以字节的方式读取文件中
	public static String readFileBytes(String fileName){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
			FileInputStream in = new FileInputStream(fileName);
		){
			byte[] b = new byte[1024];
			int len = 0;
			StringBuilder builder  = new StringBuilder();
			while((len=in.read(b))!=-1){
				builder.append(new String(b, 0, len));
			}
			return builder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//以字符的方式进行 读取
	public static String readFileChars(String fileName){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			FileReader reader = new FileReader(fileName);	
		){
			char[] b = new char[64];
			int len = 0;
			StringBuilder builder  = new StringBuilder();
			while((len=reader.read(b))!=-1){
				builder.append(new String(b, 0, len));
			}
			return builder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//以行读取
	public static String readFileLine(String fileName){
		//获取当前的文件
		File file  = new File(fileName);
		//获取当前文件的所在的目录，如果目录不存在，就采用自动创建目录的方式 
		File rootPath = file.getParentFile();
		if(!rootPath.exists())rootPath.mkdirs();
		try (
			//建立输出流
			FileReader fileReader = new FileReader(fileName);	
			BufferedReader reader = new BufferedReader(fileReader);
		){
			String line = null;
			StringBuilder builder  = new StringBuilder();
			while((line = reader.readLine())!=null){
				builder.append(line+"\r\n");
			}
			return builder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	public static void main(String[] args) {
		String file = "c://test/a.txt";
//		String result1 = readFileBytes(file);
//		System.out.println("*********************************");
//		System.out.println(result1);
//		String result2 = readFileChars(file);
//		System.out.println("*********************************");
//		System.out.println(result2);
		String result3 = readFileLine(file);
		System.out.println("*********************************");
		System.out.println(result3);
	}
}
