package com.gavin.socket;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.gavin.string.StringUtils;



public class TZDownloadUtil {
	
	/**
	 * 抓取网页源代码
	 * 方法名：getHtmlSource<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年5月19日-下午11:34:33 <br/>
	 * 手机:1564545646464<br/>
	 * @param link
	 * @return String<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static String getHtmlSource(String link){
		try {
			//第一步：初始化以URL对象
			URL url =new URL(link);
			//第二步：获取打开URL和java程序之间连接
			HttpURLConnection connection = (HttpURLConnection)url.openConnection();
			//connection.setConnectTimeout(6000);//6秒之内如果没有响应，此次请求结束,如果不设定是一致等待
			//伪装浏览器的方式去抓取网络信息
			connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
			//获取网页的编码
			String encoding = StringUtils.defaultValue(connection.getContentEncoding(),"utf-8");
			System.out.println(encoding);
			//第三步:通过IO网络下载InputStream
			StringBuilder builder = new StringBuilder();
			try (
				//字节流
				InputStream inputStream = connection.getInputStream();
				//字符流
				InputStreamReader isr = new InputStreamReader(inputStream,encoding);
				//缓存流
				BufferedReader reader = new BufferedReader(isr);
			){
				String line = "";
				while((line=reader.readLine())!=null){
					builder.append(line+"\r\n");
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return builder.toString();
			//第四步：开始读取
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 下载网络资源文件
	 * 方法名：downloadFile<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年5月19日-下午11:34:14 <br/>
	 * 手机:1564545646464<br/>
	 * @param linkFile
	 * @param path void<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static void downloadFile(String linkFile,String path){
		try {
			//第一步：初始化以URL对象
			URL url =new URL(linkFile);
			//第二步：获取打开URL和java程序之间连接
			HttpURLConnection connection = (HttpURLConnection)url.openConnection();
			//connection.setConnectTimeout(6000);//6秒之内如果没有响应，此次请求结束,如果不设定是一致等待
			//伪装浏览器的方式去抓取网络信息
			connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
			//获取网页的编码
			String encoding = StringUtils.defaultValue(connection.getContentEncoding(),"utf-8");
			System.out.println(encoding);
			//第三步:通过IO网络下载InputStream
//			System.out.println(connection.getContentLengthLong());
//			System.out.println(connection.getContentType());
//			System.out.println(connection.getResponseMessage());
//			System.out.println(connection.getDate());
//			System.out.println(connection.getFileNameMap());
//			System.out.println(connection.getRequestMethod());
//			System.out.println(connection.getContentLength());
			
			String name = linkFile.substring(linkFile.lastIndexOf("/")+1);
			//创建磁盘目录
			File file = new File(path);
			//如果文件夹不存在，就创建
			if(!file.exists())file.mkdirs();
			//输入到目标文件
			File filename = new File(file,name);	
			try (
				//字节流
				InputStream inputStream = connection.getInputStream();
				FileOutputStream outputStream = new FileOutputStream(filename)
			){
				byte[] b = new byte[2048];
				int len = 0;
				while((len=inputStream.read(b))!=-1){
					outputStream.write(b, 0, len);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			//第四步：开始读取
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		
		
		
//		TCP UDP连接 Socket和SocketAddress. RMIService --java.io.searialize
		
		//===>网络资源下载/网页另存为/模拟文件上传/静态化/spider(程序蜘蛛)
		
		
//		String link = "http://www.luoo.net/";
//		String htmlsource = getHtmlSource(link);
//		try {
//			FileUtils.writeStringToFile(new File("d://luooindex.html"), htmlsource, "utf-8");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		//正则 jsoup htmlparser都获取网页源码中的图片地址---进行批量下载
//		String url = "http://7xkszy.com2.z0.glb.qiniucdn.com/pics/vol/573b56cd3e387.jpg";
		
		
		for(int j=818;j<=821;j++){
			for(int i=1;i<=12;i++){
				try {
					String name = i+"";
					if(i<10)name = "0"+i;
					String url = "http://luoo-mp3.kssws.ks-cdn.com/low/luoo/radio"+j+"/"+name+".mp3";
					downloadFile(url,"d://download/radio"+j);
				} catch (Exception e) {
					continue;
				}
			}
		}
	}
}
