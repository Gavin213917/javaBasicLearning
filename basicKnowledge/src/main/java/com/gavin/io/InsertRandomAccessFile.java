package com.gavin.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;

public class InsertRandomAccessFile {

	/**
	 * RandomAccessFile:任意访问
	 * 由于RandomAccessFile可以自由的访问文件的任意位置，所有如果只需要访问文件的部分内容，
	 * 而不是把文件从头读到尾，使用RandomAccessFile将是更好的选择。
	 * 
	 * r:以只读的方式打开指定文件，如果文件不存在，创建该文件
	 * rw:以读和写的方式打开指定文件，
	 * @throws IOException 
	 * 
	 */
	public static void main(String[] args) throws IOException {
		int pos = 4;
		String content = "我爱你";
		/*写入*/
		File tmp = File.createTempFile("temp",null);
		tmp.deleteOnExit();
		try (
				RandomAccessFile randomAccessFile = new RandomAccessFile(new File("d://a.txt"), "rw");
				FileOutputStream outputStream = new FileOutputStream(tmp);
				FileInputStream inputStream = new FileInputStream(tmp);
			){
			
			randomAccessFile.seek(pos);
			byte[] b=new byte[64];
			int hasread = 0;
			while ((hasread = randomAccessFile.read(b))!=-1) {
				outputStream.write(b, 0, hasread);
			}
			
			//插入内容
			randomAccessFile.seek(pos);
			//追加需要的插入内容
			randomAccessFile.write(content.getBytes());
			while ((hasread = inputStream.read(b))!=-1) {
				randomAccessFile.write(b, 0, hasread);
			}
			
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
}
