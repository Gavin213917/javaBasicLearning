package com.gavin.socket.chat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class ClientThread  implements  Runnable{
	
	
	private Socket socket = null;
	BufferedReader br=null;

	public ClientThread(Socket socket) throws IOException{
		this.socket = socket;
		br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
	}
	
	
	public void run() {
		try {
			String content = null;
			while((content=br.readLine())!=null){
				System.out.println(content);
			}
		} catch (Exception e) {
		}
	}
}
