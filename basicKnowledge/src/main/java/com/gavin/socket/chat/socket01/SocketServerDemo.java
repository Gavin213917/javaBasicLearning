package com.gavin.socket.chat.socket01;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;import com.sun.swing.internal.plaf.metal.resources.metal_zh_TW;

/**
 * 
 *  服务器端
 * ScoketServer<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年5月24日-下午10:56:10 <br/>
 * @version 1.0.0<br/>
 *
 */
public class SocketServerDemo {

	private int port;
	
	public SocketServerDemo(int port){
		this.port = port;
	}
	
	
	/*
	 * nodejs
	 * 
	 * http.js
	 * 
	 * var http = require("http");
	 * http.createServer(()=>(req,res){
	 * 	res.write("i love you")l		
	 * }).listen(6666);
	 * 
	 * node http
	 * 
	 *  http://localhost:6666
	 * 
	 * 
	 * */
	
	//自定义服务器代码
	public void start(){
		try {
			ServerSocket serverSocket = new ServerSocket(port);
			System.out.println("服务器已经启动，监听的端口号是:"+this.port);
			System.out.println("正则等待客户端的连接.......");
			
			
			Socket socket = serverSocket.accept();//阻塞--有客户端请求
			
			
			//建立socket的输出流，true代表自动刷新，也就说不用在调用witer.flush()方法
			PrintWriter out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream(), "UTF-8"),true);
			out.println("服务器连接成功......");
			out.println("输入exit断开与服务器的连接...");
			boolean done = false;
			
			
			//获取客户端的数据内容
			BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream(),"utf-8"));
			while(!done){
				String line = reader.readLine();
				if(line==null){
					done = true;
				}else{
					System.out.println("客户端传递过来的内容是:"+line);
					
					//退出
					if(line.equals("i love you")){
						out.println("【来自服务器推送的消息是: really!!!,yes baby】");
					}else{
						out.println("【来自服务器推送的消息是: get out!!!】");
					}
					
					if(line.trim().equalsIgnoreCase("exit")){
						done = true;//终止循环
					}
				}
			}
			
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
		try {
			//调用
			SocketServerDemo server = new SocketServerDemo(6666);
			server.start();
		} catch (Exception e) {
			System.out.println("服务器监听端口:【6666】出现异常");
		}
	}
}
