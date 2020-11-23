package com.gavin.socket.chat.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ProcessParser {

	
	public static void main(String[] args) {
		try {
//			Process process = Runtime.getRuntime().exec("ipconfig -all");
			//布置一个作业：百度搜索：java实现mysql的备份和还原,第一事情：安装mysql数据库
			Process process = Runtime.getRuntime().exec("netstat -ano");
			try(
				InputStreamReader isr = new InputStreamReader(process.getInputStream());
				BufferedReader reader = new BufferedReader(isr); 
			){
				String content = null;
				while((content=reader.readLine())!=null){
					System.out.println(content);//正则表达式
				}
				
			}catch (Exception e) {
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		
	}
}
