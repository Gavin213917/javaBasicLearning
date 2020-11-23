package com.gavin.socket.chat.socket01;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.Scanner;

public class Client {
	private static String host= "127.0.0.1";
	private static int port= 3698;
	public static void main(String[] args) {
		try {
			Scanner scanner = new Scanner(System.in);
			while(true){
				Socket socket = new Socket(host, port);
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
				String line = scanner.nextLine();
				System.out.println("客户端发送给服务器端的数据是："+line);
				writer.write(line);
				writer.close();
				socket.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
