package com.gavin.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAcessFileUtil {
	
	
	/*
	 * java.io.RandomAccessFile:
	 * 是javaio中最为丰富的一个流，它既有输入功能有输入功能更。同时他可以进行文件分割和合并
	 * 以及指定位置开始读和写。
	 * getFilePointer(),获取读取文件内容的seek设定的位置
	 * seek(long post):设定读取指针的位置
	 * RandomAccessFile(file,)
	 * r:只读打开文件
	 * rw:以读写的方式打开文件
	 * rws
	 * rwd
	 * 
	 * */
	
	/**
	 * 读取文件
	 * @param file
	 * @param pos
	 * @return
	 */
	public static String readFile(String file,int pos){
		try (
			//创建一个任意访问流，以只读的方式创建
			RandomAccessFile randomAccessFile = new RandomAccessFile(file,"r");
		){
			//可以设定读取起点位置
			randomAccessFile.seek(pos);
			//以字节流的方式进行读入
			byte[] b = new byte[1024];
			int len = 0;
			StringBuilder builder = new StringBuilder();
			//开始读
			while((len = randomAccessFile.read(b))!=-1){
				builder.append(new String(b, 0, len));
			}
			//返回
			return builder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * 写入文件
	 * @param file
	 * @param pos
	 * @return
	 */
	public static boolean writerFile(String content,String file){
		try (
			//创建一个任意访问流，以只读的方式创建
			RandomAccessFile randomAccessFile = new RandomAccessFile(file,"rw");
		){
			//可以设定读取起点位置
//			randomAccessFile.seek(randomAccessFile.length());//写入的内容追加到后面
			randomAccessFile.seek(2);//从第二个位置开始插入，後面的内容被插入的内容覆盖
			randomAccessFile.write(content.getBytes());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	/**
	 * 讲内容插入到文件的指定位置
	 * @param content 插入的内容
	 * @param fileName 插入的文件
	 * @param pos 位置
	 */
	public static void insertContent(String content,String fileName,long pos){
		//创建一个临时文件
		File tmpFile = null;
		try {
			tmpFile = File.createTempFile("tmp", null);
			tmpFile.deleteOnExit();//整个程序执行完毕后删除
//			tmpFile.delete();//程序执行到这里后，马上删除
		} catch (IOException e) {
			e.printStackTrace();
		}
		try (
			//创建一个任意访问流，以只读的方式创建
			RandomAccessFile randomAccessFile = new RandomAccessFile(fileName,"rw");
			
			//输出流
			FileOutputStream out = new FileOutputStream(tmpFile);
			//输入流
			FileInputStream in = new FileInputStream(tmpFile);
			
		){
			//a.txt===01 23456789
			//temp.tmp== 23456789
			randomAccessFile.seek(pos);
			/*任意访问流开始读取内容,插入到临时文件*/
			byte[] b = new byte[1024];
			int len = 0;
			while((len=randomAccessFile.read(b))!=-1){
				out.write(b, 0, len);
			}
			//设定写的起跑位置
			randomAccessFile.seek(pos);
			randomAccessFile.write(content.getBytes());
			//01ccc5789
			//拿到临时文件的内容,拼接回去
			while((len=in.read(b))!=-1){
				randomAccessFile.write(b,0,len);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
		String file = "c://test/a.txt";
//		String result = readFile(file, 4);
//		System.out.println(result);
		
		
		insertContent("ccc",file,2);
		
//		writerFile("abcdefg",file);
	}
}
