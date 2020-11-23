package com.gavin.socket.chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class MyClient {

	public static void main(String[] args) throws UnknownHostException, IOException {
		//建立客户端连接
		Socket socket = new Socket("127.0.0.1", 3000);
		
		//启动客户端的ClinetThread线程不断的获取服务端推送过来的数据
		new Thread(new ClientThread(socket)).start();
		
		//获取socket的输出流
		PrintStream printStream = new PrintStream(socket.getOutputStream());
		String line = null;
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		while((line=reader.readLine())!=null){
			printStream.println(line);
		}
	}
}
