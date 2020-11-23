package com.gavin.io.NIO;

import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

public class ChannelTest {

	
	public static void main(String[] args) {
		
		//针对小文件的--二进制文件的处理
//		File file = new File("d://ccccc.jpg");
//		try (
//			//输入通道
//			FileChannel inChannel = new FileInputStream(file).getChannel(); 
//			//输出通道
//			FileChannel outChannel = new FileOutputStream("f://111.jpg").getChannel();	
//		){
//			//map()	
//			MappedByteBuffer buffer = inChannel.map(MapMode.READ_ONLY,0,  file.length());
//			outChannel.write(buffer);
//			buffer.clear();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		
		//字符流的处理
//		File file = new File("d://luoo.html");
//		try (
//			//输入通道
//			FileChannel inChannel = new FileInputStream(file).getChannel(); 
//			//输出通道
//			FileChannel outChannel = new FileOutputStream("f://luoo.html").getChannel();	
//		){
//			//map()	
//			MappedByteBuffer buffer = inChannel.map(MapMode.READ_ONLY,0,  file.length());
//			outChannel.write(buffer);
//			buffer.clear();
//			
//			//字符集工具类
//			Charset charset = Charset.forName("UTF-8");
//			//文件内容解码器
//			CharsetDecoder decoder = charset.newDecoder();
//			CharBuffer charBuffer = decoder.decode(buffer);
//			System.out.println(charBuffer.toString());
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		
		//写入功能
//		try (
//			//输出通道
//			FileChannel outChannel = new FileOutputStream("f://a.txt").getChannel();	
//		){
////			CharBuffer buffer  = CharBuffer.wrap("我爱你24234234");
////			Charset charset = Charset.defaultCharset();
////			ByteBuffer byteBuffer = charset.encode(buffer);
//			ByteBuffer byteBuffer = Charset.defaultCharset().encode("我爱你");
//			//map()	
//			outChannel.write(byteBuffer);
//			byteBuffer.clear();
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		
		
		
		
		/*
		 * 分段读取内容
		 * */
		try (
				
			FileInputStream inputStream =  new FileInputStream("d://luoo.html");
			//创建一个通道
			FileChannel fileChannel = inputStream.getChannel();
		){
			//定义一个ByteBuffer对象
//			byte[] c = new byte[1024];
			ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
			
//			了解Charset
			
//			int len = 0;
//			while((len=inputStream.read(c))!=-1){
//				System.out.println(new String(c,0,len));
//			}
			
			while(fileChannel.read(byteBuffer)!=-1){
				byteBuffer.flip();
				//创建字符解析类
				Charset charset = Charset.forName("UTF-8");
				//解析字节类
				CharBuffer charBuffer = charset.decode(byteBuffer);
				//打印
				System.out.println(charBuffer.toString());
				//重新初始化，为下一次读取数据做准备
				byteBuffer.clear();
			}
			
		} catch (Exception e) {
		}
		
		
		
		
		
	}
}
