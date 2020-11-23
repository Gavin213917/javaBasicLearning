package com.gavin.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileDemo7 {

	
	public static void main(String[] args) throws IOException {
		
		/*
		 * 
		 * IO:输入流(InputStream)和输出流(OutStream)---操作File对象的过程
		 * 
		 * IO:
		 * 
		 * 字节流  : 基类(父类)：InputStream
		 * ----范围：文件拷贝，复制，粘贴，生成文件
		 * ----应用于：二进制文件的处理(图片，视频，音频。)
		 * ---典型的子类：FileInputStream
		 * ---方法：
		 * ---int read()===从输入流里面取单个字节，返回所读取的内容。
		 * ---int read(byte[] b)=== 从输入流中最多读取b.length个字节数据，并将其存储在字节数组中b中，返回字节数
		 * ---int read(byte[] b,int off,int len)===从输入流中最多读取len个字节的数据,
		 * ---available()代表还剩下多少没有读取完毕。读取完毕返回0
		 * 
		 * 
		 * 字符流:用来操作文件内容的,---文本文件
		 * 一般是对应文本文件内容的添加，修改，追加，和删除。
		 * 
		 * 字节流 和 字符流一般的用户几乎一摸一样的，区别在于字节流和字符流操作的单元不同--字节流操作数据单元8位。
		 * 而字符流可以操作16位。
		 * 
		 * 1byte = 8 bit 
		 * 中 2byte = 16bit;
		 * 
		 * char[]--字符流
		 * byte[]---字节流
		 * 
		 * 
		 * 
		 * 
		 * 
		 * 缓冲流:它是对字节流和字符流的以缓冲作用
		 * 
		 * 
		 * 二进制文件:图片，视频，音频。
		 * 文本文件:html,java,txt,
		 * 
		 * office文件:.doc,docx,pdf,--io读取---poi/jxl去读取--io
		 * */
		
		
		//文件的复制
		File file = new File("e://luoo.html");//小晨   C:\Users\Administrator\Desktop
		File file2 = new File("d://luoo.html");
		if(file2.exists()){
			//字节流-
			//输入流
			FileInputStream inputStream = null;
			//输出流
			FileOutputStream outputStream = null;
			try {
				inputStream = new FileInputStream(file2);
				outputStream = new FileOutputStream(file); 
				//获取输入流（读入）
				int len = 0;
				byte[] bs = new byte[1024];
				while ((len=inputStream.read(bs))!=-1) {
					outputStream.write(bs,0,len);
				}
				outputStream.flush();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					if(outputStream!=null)outputStream.close();
					if(inputStream!=null)inputStream.close();
				} catch (IOException e2) {
					e2.printStackTrace();
				}
			}
		}
	}
}

