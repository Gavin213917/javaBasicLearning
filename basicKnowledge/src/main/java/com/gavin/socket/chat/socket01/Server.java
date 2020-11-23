package com.gavin.socket.chat.socket01;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 
 * 服务端
 * Server<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年5月24日-下午10:16:34 <br/>
 * @version 1.0.0<br/>
 *
 */
public class Server {
	
	//服务器ServerSocket 定义端口，和ip
	//客户端 Socket 遵循 端口和ip
	
	private static int port = 3698;
	public static void main(String[] args) {
		try {
			//定义服务器端的socket服务
			ServerSocket serverSocket = new ServerSocket(port);
			//不停的监听不同的客户端发送过来的请求
			while(true){
				//每当接收到客户端socket请求的时候服务器也会产生一个socket
				Socket socket = serverSocket.accept();
				System.out.println("服务器已经启动端口是:"+port);
				
				
				
				BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
				System.out.println("来自客户端的数据===>"+reader.readLine());
				
				
				
				reader.close();
				socket.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	
}
