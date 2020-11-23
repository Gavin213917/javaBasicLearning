package com.gavin.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import com.sun.org.apache.bcel.internal.generic.NEW;

public class Test {

	public static void main(String[] args) {
		File file = new File("D:/a.txt");
		if (file.exists()) {
			try {
				FileInputStream in = new FileInputStream(file);
				int len = 0;
				byte[] b = new byte[1024];
				int count = 0;
				while ((len = in.read(b)) != -1) {
//					System.out.print((char) len);
					System.out.print(new String(b,0,len,"utf-8"));//以1024个字节读取
					count++;
				}
				System.out.println("=================>" + count);
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

	}

}
