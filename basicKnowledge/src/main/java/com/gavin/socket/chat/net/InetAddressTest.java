package com.gavin.socket.chat.net;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetAddressTest {

	
	public static void main(String[] args) {
		try {
			InetAddress address = InetAddress.getByName("www.baidu.com");
			//判断是否可以到达，用于测试尽最大的努力试图到达主机。
//			System.out.println(address.isReachable(5000));
			System.out.println(address.getHostAddress());//根据hostname获取ip地址
			System.out.println(address.getHostName());
			System.out.println(address.getCanonicalHostName());
			System.out.println("======================");
			
			InetAddress address2 = InetAddress.getLocalHost();
			System.out.println(address2.getHostName());
			System.out.println(address2.getHostAddress());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		
		
	}
}
