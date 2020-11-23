package com.gavin.socket.chat.socket01;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;


/**
 * 
 * 客户端
 * Client01
 * 创建人:xuchengfei 
 * 时间：2016年5月24日-下午11:11:39 
 * @version 1.0.0
 *
 */
public class Client01 {
	private  String host;
	private  int port;
	
	public Client01(String host,int port){
		this.host = host;
		this.port = port;
	}
	
	/**
	 * 连接服务器的代码
	 * 方法名：connectionServer
	 * 创建人：xuchengfei 
	 * 时间：2016年5月24日-下午11:13:25 
	 * 手机:1564545646464 void
	 * @exception 
	 * @since  1.0.0
	 */
	public void connectionServer(){
		try {
			Socket socket = null;
			if(host.equals("localhost") || host.equals("127.0.0.1")){
				socket = new Socket(InetAddress.getLocalHost(), port);
			}else{
				socket = new Socket(InetAddress.getByName(host), port);
			}
			
			//建立socket的输入流，获取服务器端推送过来的数据 reader
			BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream(),"utf-8"));
			System.out.println("服务器的信息是:"+reader.readLine());
			System.out.println("服务器的信息是:"+reader.readLine());
			
			//开始建立socket的写入（输出流）
			System.out.print("请输入>>>");
			PrintWriter out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream(),"utf-8"),true);
			
			//建立控制台的输入流
			BufferedReader bfr = new BufferedReader(new InputStreamReader(System.in));
			
			
			BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream(),"utf-8")); 
			
			boolean done = false;
			while(!done){
				String line = bfr.readLine();//来自控制台
				out.println(line);//往socket写入数据
				if(line.equalsIgnoreCase("exit")){
					done = true;
				}else{
					String info = in.readLine();
					System.out.println("服务器的信息:"+info);
					if(!done){
						System.out.println("请输入>>>");
					}
				}
			}
			
//			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
		try {
			new Client01("127.0.0.1", 6666).connectionServer();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
