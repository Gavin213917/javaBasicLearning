package com.gavin.socket.chat.net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.Map;

public class URLDemo {

	
	public static void main(String[] args) {
		
		
		try {
//			URL url = new URL("https","alimarket.taobao.com",80,"/markets/alimama/amp?username=keke");
//			URL url = new URL("http://www.baidu.com");
//			URL url = new URL("https://aecpm.alicdn.com/simba/img/TB1Bu.YMpXXXXcAXXXXSutbFXXX.jpg");
			String link = "https://alimarket.taobao.com/markets/alimama/amp?wh_cat=nvxie&wh_shop=%E6%B1%9F%E5%8D%97%E5%85%88%E7%94%9F%E6%97%97%E8%88%B0%E5%BA%97&qq-pf-to=pcqq.c2c&ali_trackid=17_c133ff6ee06f0efc1ed767fa37c462cf&spm=a21bo.50862.201862-3.1.LJf6WQ";
			URL url = new URL(link);
			System.out.println("获取URL的资源名字:"+url.getFile());
			System.out.println("获取URL的主机名:"+url.getHost());
			System.out.println("获取URL的路径部分:"+url.getPath());
			System.out.println("获取URL的端口号："+url.getPort());//-1代表的默认端口：80
			System.out.println("获取URL的协议名称:"+url.getProtocol());
			System.out.println("获取URL的查询字符串部分："+url.getQuery());
			
			Map<String,String> parmas = URLEncodedUtils.URLRequest(link);
			System.out.println(parmas.get("wh_cat"));
			System.out.println(URLDecoder.decode(parmas.get("wh_shop"),"UTF-8"));
			
			System.out.println("=========================");
			
//			URI uri = new URI(link);
//			System.out.println(uri.getPort());
//			System.out.println(uri.getHost());
//			System.out.println(uri.getScheme());
//			System.out.println(uri.getPath());
			
			//打开网络服务的连接对象
			URLConnection connection = url.openConnection();
			try(
				//获取连接的字节输入流
				InputStream inputStream = connection.getInputStream();
				//网络图片、视频---字节流(8--1byte)
				//网络源代码---字符流(16--1byte)
				//将字节流转换成字符流--网页的源代码
				InputStreamReader isr = new InputStreamReader(inputStream,"utf-8");//char--中
				BufferedReader reader = new BufferedReader(isr); 
			){
				String content = null;
				while((content=reader.readLine())!=null){
					System.out.println(content);
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
