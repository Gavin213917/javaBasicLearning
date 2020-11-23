package com.gavin.socket.chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

public class ServerThread implements Runnable {

	
	//定义当前线程所处理的Socket
	Socket s=null;
	//获取输入流
	BufferedReader br = null;
	
	public ServerThread(Socket socket) throws IOException {
		this.s = socket;
		//初始化输入流
		br = new BufferedReader(new InputStreamReader(s.getInputStream()));
	}
		
	@Override
	public void run() {
		String content = null;
		try {
			while((content=readFormSocket())!=null){
				//遍历socketlist中的每一个socket发送的请求信息
				for (Socket socket : MyServer.scoketList) {
					PrintStream pStream = new PrintStream(socket.getOutputStream());
					pStream.println("客户端推送来的数据是："+content);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private String readFormSocket(){
		try {
			return br.readLine();
		} catch (Exception e) {
			MyServer.scoketList.remove(s);
			return null;
		}
	}

}
