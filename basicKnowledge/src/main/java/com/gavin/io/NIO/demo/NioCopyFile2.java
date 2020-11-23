package com.gavin.io.NIO.demo;

import java.io.File;
import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;


public class NioCopyFile2 {

	
	public static void main(String[] args) {
		File file = new File("d://keke.sql");
		try (
			FileChannel inChannel = new FileInputStream(file).getChannel();
		){
			//定义一个ByteBuffer对象，用于重复获取数据
			ByteBuffer buffer = ByteBuffer.allocate(256);
			while (inChannel.read(buffer)!=-1) {
				//锁定buffer的空白区
				buffer.flip();
				Charset charset = Charset.forName("utf-8");
				//创建解码器
				CharsetDecoder decoder = charset.newDecoder();
				//将buffer内容进行解码
				CharBuffer charBuffer = decoder.decode(buffer);
				System.out.println(charBuffer);
				//讲buffer初始化，为下一次读取数据做准备
				buffer.clear();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
