package com.gavin.object.system;

import java.io.IOException;

public class RuntimeDemo {

	public static void main(String[] args) throws IOException {
		//Runtime
		Runtime runtime = Runtime.getRuntime();
//		System.out.println("处理器的数量:"+runtime.availableProcessors());
//		System.out.println("空闲内存数："+runtime.freeMemory());
//		System.out.println("总内存大小:"+runtime.totalMemory());
//		System.out.println("可用最大内存数："+runtime.maxMemory());
		
		//通过程序打开文本文件
		runtime.exec("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
		
	}
	
	
}
