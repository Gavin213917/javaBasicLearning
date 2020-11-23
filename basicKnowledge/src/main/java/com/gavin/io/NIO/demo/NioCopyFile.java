package com.gavin.io.NIO.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.CharBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;

public class NioCopyFile {

	
	public static void main(String[] args) {
		File file = new File("d://ccccc.jpg");
		try (
			FileChannel inChannel = new FileInputStream(file).getChannel();
			FileChannel outChannel = new FileOutputStream("f://a.jpg").getChannel();	
		){
			
			MappedByteBuffer byteBuffer =  inChannel.map(FileChannel.MapMode.READ_ONLY, 0, file.length());
			//使用解码器
			Charset charset = Charset.forName("UTF-8");
			//直接将buffer的数据全部输出
			outChannel.write(byteBuffer);
			//再次调用buffer的clear方法，复原limit,position的位置 
			byteBuffer.clear();
			//创建解码器
			CharsetDecoder decoder = charset.newDecoder();
			//使用解码器将ByteBuffer转换成功CharBuffer
			CharBuffer charBuffer = decoder.decode(byteBuffer);
			System.out.println(charBuffer);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
