package com.gavin.io;

import java.io.File;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo {

	/**
	 * RandomAccessFile:任意访问
	 * 由于RandomAccessFile可以自由的访问文件的任意位置，所有如果只需要访问文件的部分内容，
	 * 而不是把文件从头读到尾，使用RandomAccessFile将是更好的选择。
	 * 
	 * r:以只读的方式打开指定文件，如果文件不存在，创建该文件
	 * rw:以读和写的方式打开指定文件，
	 * 
	 */
	public static void main(String[] args) {
		/*读*/
//		try (
//			RandomAccessFile randomAccessFile = new RandomAccessFile(new File("d://a.txt"), "r");	
//		){
//			System.out.println("初始指针："+randomAccessFile.getFilePointer());
//			//位移指针的位置
//			randomAccessFile.seek(2);
//			byte[] b = new byte[1024];
//			int len = 0;
//			while((len = randomAccessFile.read(b))!=-1){
//				System.out.println(new String(b,0,len));
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		/*写入*/
		try (
				RandomAccessFile randomAccessFile = new RandomAccessFile(new File("d://a.txt"), "rw");	
			){
				System.out.println("初始指针："+randomAccessFile.getFilePointer());
				//位移指针的位置
				randomAccessFile.seek(randomAccessFile.length());
//				randomAccessFile.writeUTF("keke\r\n");
				randomAccessFile.write("keke\r\n".getBytes());
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
}
