package com.gavin.socket.chat.net;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import sun.management.counter.Variability;

public class URLDemo2 {

	
	
	
	/**
	 * 模拟实现网络的Get的请求
	 * 方法名：sendGet<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年5月21日-下午10:37:42 <br/>
	 * 手机:1564545646464<br/>
	 * @return String<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static String sendGet(String url,String params){
		String urlName = url+"?"+params;
		System.out.println(urlName);
		StringBuilder stringBuilder = new StringBuilder();
		try {
			//建立一个URL
			URL neturl = new URL(urlName);
			//打开URL之间的连接
			URLConnection connection = neturl.openConnection();
			//设置通用的请头信息--模拟一个请求头--去请网络资源
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
			connection.setConnectTimeout(2000);//连接等待的时长
			connection.setReadTimeout(2000);//
			
//			setConnectTimeout：设置连接主机超时（单位：毫秒）
//			setReadTimeout：设置从主机读取数据超时（单位：毫秒）
			//建立连接
			connection.connect();
			
			//获取响应头的信息
//			Map<String, List<String>> map = connection.getHeaderFields();
//			for(Map.Entry<String, List<String>> enter:map.entrySet()){
//				System.out.println(enter.getKey()+"==="+enter.getValue());
//			}
			
			
			System.out.println("getContent===="+connection.getContent());
			System.out.println("getContentEncoding===="+connection.getContentEncoding());
			System.out.println("getContentLength===="+connection.getContentLength());//网络文件的总大小
			System.out.println("getExpiration===="+connection.getExpiration());
			System.out.println("getLastModified===="+connection.getLastModified());
			
			try (
					BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
			){
				String content = null;
				while((content=reader.readLine())!=null){
					stringBuilder.append(content+"\r\n");
				}
			} catch (Exception e) {
			}
			return stringBuilder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	
	/**
	 * 模拟实现网络的Post的请求
	 * 方法名：sendGet<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年5月21日-下午10:37:42 <br/>
	 * 手机:1564545646464<br/>
	 * @return String<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static String sendPost(String url,String params){
		StringBuilder stringBuilder = new StringBuilder();
		try {
			//建立一个URL
			URL neturl = new URL(url);
			//打开URL之间的连接
			URLConnection connection = neturl.openConnection();
			//设置通用的请头信息--模拟一个请求头--去请网络资源
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
			//发送post请求的代码
			connection.setDoOutput(true);
			connection.setDoInput(true);
			
		
			try ( 
				PrintWriter out = new PrintWriter(new OutputStreamWriter(connection.getOutputStream(),"UTF-8"));
			){
				out.print(params);
				out.flush();
			} catch (Exception e) {
			}
			
			//获取响应头的信息
//			Map<String, List<String>> map = connection.getHeaderFields();
//			for(Map.Entry<String, List<String>> enter:map.entrySet()){
//				System.out.println(enter.getKey()+"==="+enter.getValue());
//			}
			
			System.out.println("getContent===="+connection.getContent());
			System.out.println("getContentEncoding===="+connection.getContentEncoding());
			System.out.println("getContentLength===="+connection.getContentLength());//网络文件的总大小
			System.out.println("getExpiration===="+connection.getExpiration());
			System.out.println("getLastModified===="+connection.getLastModified());
			
			try (
				BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
			){
				String content = null;
				while((content=reader.readLine())!=null){
					stringBuilder.append(content+"\r\n");
				}
			} catch (Exception e) {
			}
			return stringBuilder.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		
		String link = "http://localhost/Login/login";
		String vString = URLEncoder.encode(URLEncoder.encode("为水电费","utf-8"),"utf-8");
		String params = "username=keke&password=123456&message="+vString;
		String source = sendGet(link, params);
//		String source = sendPost(link, "username=keke&password=123456&message=为水电费");
		System.out.println(source);
		
		
		System.out.println(URLDecoder.decode("%E4%B8%BA%E6%B0%B4%E7%94%B5%E8%B4%B9", "utf-8"));
		System.out.println(URLDecoder.decode("我爱你", "utf-8"));
			
	}
}
