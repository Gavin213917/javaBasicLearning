package com.gavin.object.system;

import java.util.Enumeration;
import java.util.Map;
import java.util.Properties;

public class SystemDemo {

	public static void main(String[] args) {
		//System类,它代表的输入，输出的类变量，并提供了一些方法用于访问环境变量，系统属性的方法，还提供加载文件和动态链接库的方法，
		
		
		//获取系统所有的环境变量
		Map<String,String> envs = System.getenv();
		for (Map.Entry<String, String> entry: envs.entrySet()) {
			System.out.println(entry.getKey()+"==="+entry.getValue());
		}
		
		System.out.println("==========================================");
		
		//获取Java的版本，操作系统信息;
		Properties properties = System.getProperties();
		Enumeration<?> enumeration = properties.propertyNames();
		while(enumeration.hasMoreElements()){
			System.out.println(enumeration.nextElement()+"===="+System.getProperty(String.valueOf(enumeration.nextElement())));
		}
		
//		System.out.println(System.getProperty("user.dir"));
		
	}
	
	
}
