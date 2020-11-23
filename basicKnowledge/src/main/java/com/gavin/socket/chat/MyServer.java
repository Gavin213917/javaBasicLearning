package com.gavin.socket.chat;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class MyServer {
	
	//定义一个保存socket的arryList,保证线程安全的
	public static List<Socket> scoketList = Collections.synchronizedList(new ArrayList<Socket>());
	
	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = new ServerSocket(3000);
		while(true){
			//等待客户端的请求
			Socket socket = serverSocket.accept();
			scoketList.add(socket);
			//当客户端连接后，就会启动一个serverthread的线程
			new Thread(new ServerThread(socket)).start();
		}
	}
}
