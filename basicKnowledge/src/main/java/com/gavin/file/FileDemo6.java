package com.gavin.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class FileDemo6 {

	
	public static void main(String[] args) throws IOException {
		
		/*
		 * 
		 * IO:输入流(InputStream)和输出流(OutputStream)---操作File对象的过程
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
		 * 字节流 和 字符流一般的用法几乎一摸一样的，区别在于字节流和字符流操作的单元不同--字节流操作数据单元8位。
		 * 而字符流可以操作16位（一个中文字符）。
		 * 
		 * 1byte = 8 bit 
		 * 中 2byte = 16bit;
		 * 
		 * char[]--字符流
		 * byte[]---字节流
		 * 
		 * 对象的初始化方式：
		 * 1、new 
		 * 2、clone
		 * 3、反射
		 * 4、io
		 * 5、ObjectInputStream
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
		
		File file = new File("d://luoo.html");//小晨
		if(file.exists()){
			//字节流  
			//AudioInputStream, ByteArrayInputStream, FileInputStream, FilterInputStream,, ObjectInputStream, PipedInputStream, SequenceInputStream, StringBufferInputStream

//			FilterInputStream in = new FileInputStream("d://luoo.html")
			FileInputStream in = null;
			try {
				//获取输入流（读入）
				in = new FileInputStream(file); 
				//单字节读取
				int count = 0;
//				byte[] b = new byte[1024];
//				int len = 0;
//				while((	len = in.read())!=-1){
//					System.out.println((char)len);
//					count++;
//				}
//				
//				System.out.println("============>"+count);
				
				
				
				//多字节读取
//				byte[] b = new byte[1024];
//				int len = 0;
//				while((	len = in.read(b))!=-1){
//					System.out.println(new String(b));
//					count++;
//				}
//				System.out.println("============>"+count);
				
				long total = file.length();
				byte[] b = new byte[1024];
				int len = 0;
				while((	len = in.read(b))!=-1){
					System.out.println(new String(b,0,len));
					System.out.println("还剩下："+in.available()+"byte");
					System.out.println("========="+(1-(in.available() / (float)total))*100);//进度条
					count++;
				}
				System.out.println("一共读取了============>"+count);
				
			} catch (IOException e) {
				e.printStackTrace();
			} finally {//jdk1.8 把这个流关闭处理掉了，不用在代码里面关闭
				try {
					if(in!=null)in.close();
				} catch (IOException e2) {
					e2.printStackTrace();
				}
			}
			
		}
	}
	
	
	
}
