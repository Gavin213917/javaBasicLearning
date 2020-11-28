package com.gavin.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

public class HttpGetPostUtil {
	/**
	* 向指定URL发送GET方法的请求
	* @param url 发送请求的URL
	* @param params 请求参数，请求参数应该是name1=value1&name2=value2的形式。
	* @return URL所代表远程资源的响应
	*/
	public static String sendGet(String url, String params){
		String result = "";
		BufferedReader in = null;
		try{
			String urlName = url;
			if(params != null && !params.equals("")){
				if(params.contains(",")){
					String[] paramArr = params.split(",");
					for (int i = 0; i < paramArr.length; i++) {
						if(!paramArr[i].equals("")){
							params = params + paramArr[i];
							if(i<paramArr.length-1){
								params = params + "&";
							}
						}
					}
				}
				urlName = url + "?" + params;
			}
			URL realUrl = new URL(urlName);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
//			conn.setRequestProperty("Accept-Charset", "UTF-8");
			// 建立实际的连接
			conn.connect();
			// 获取所有响应头字段
			Map<String, List<String>> map = conn.getHeaderFields();
			// 遍历所有的响应头字段
			for (String key : map.keySet()){
				System.out.println(key + "--->" + map.get(key));
			}
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(
			new InputStreamReader(conn.getInputStream(), "UTF-8"));
			String line;
			while ((line = in.readLine()) != null){
				result += "\n" + line;
			}
		}catch (Exception e){
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		}finally{
			// 使用finally块来关闭输入流
			try{
				if (in != null){
					in.close();
				}
			}catch (IOException ex){
				ex.printStackTrace();
			}
		}
		return result;
	}

	 public static String httpPostFileExe(String url,String filePath,
			 String ip,String taskeId,String basePath,String sign){
	        //1:创建一个httpclient对象
	        HttpClient httpclient = new DefaultHttpClient();
	        Charset charset = Charset.forName("UTF-8");//设置编码
	        try {
	            //2：创建http的发送方式对象，是GET还是post
	            HttpPost httppost = new HttpPost(url);

	            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
	            MultipartEntity reqEntity = new MultipartEntity();

	            FileBody bin = new FileBody(new File(filePath));
	            StringBody ips = new StringBody(ip,charset);
	            StringBody taskeIds = new StringBody(taskeId,charset);
	            StringBody basePaths = new StringBody(basePath,charset);
	            StringBody signs = new StringBody(sign,charset);
	            
	            ArrayList<FileBody> fileBodys = new ArrayList();
	            fileBodys.add(bin);

	            addFileBodyPart("file", fileBodys, reqEntity);
	            reqEntity.addPart("ip", ips);
	            reqEntity.addPart("taskeId", taskeIds);
	            reqEntity.addPart("path", basePaths);
	            reqEntity.addPart("sign", signs);
	            httppost.setEntity(reqEntity);

	            //4：执行httppost对象，从而获得信息
	            HttpResponse response = httpclient.execute(httppost);
	            HttpEntity resEntity = response.getEntity();

	            //获得返回来的信息，转化为字符串string
	            String resString = EntityUtils.toString(resEntity);
	            
	            return resString;

	        } catch (UnsupportedEncodingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IllegalStateException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } finally {
	            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
	        }
	    }
	 
	 
	 public static String httpPostFileJar(String url,String filePath,String ip,String taskeId,String basePath,String sign,String jdkpath){
	        //1:创建一个httpclient对象
	        HttpClient httpclient = new DefaultHttpClient();
	        Charset charset = Charset.forName("UTF-8");//设置编码
	        try {
	            //2：创建http的发送方式对象，是GET还是post
	            HttpPost httppost = new HttpPost(url);

	            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
	            MultipartEntity reqEntity = new MultipartEntity();

	            FileBody bin = new FileBody(new File(filePath));
	            StringBody ips = new StringBody(ip,charset);
	            StringBody taskeIds = new StringBody(taskeId,charset);
	            StringBody basePaths = new StringBody(basePath,charset);
	            StringBody signs = new StringBody(sign,charset);
	            StringBody jdkpaths = new StringBody(jdkpath,charset);
	            
	            ArrayList<FileBody> fileBodys = new ArrayList();
	            fileBodys.add(bin);

	            addFileBodyPart("file", fileBodys, reqEntity);
	            reqEntity.addPart("ip", ips);
	            reqEntity.addPart("taskeId", taskeIds);
	            reqEntity.addPart("path", basePaths);
	            reqEntity.addPart("jdk", jdkpaths);
	            reqEntity.addPart("sign", signs);
	            httppost.setEntity(reqEntity);

	            //4：执行httppost对象，从而获得信息
	            HttpResponse response = httpclient.execute(httppost);
	            HttpEntity resEntity = response.getEntity();

	            //获得返回来的信息，转化为字符串string
	            String resString = EntityUtils.toString(resEntity);
	            
	            return resString;

	        } catch (UnsupportedEncodingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IllegalStateException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } finally {
	            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
	        }
	    }
	 
	 public static String httpPostFileDb(String url,String filePath,String ip,
			 String taskeId,String user,
			 String password,
			 String dbType,
			 String dburl,String sign){
	        //1:创建一个httpclient对象
	        HttpClient httpclient = new DefaultHttpClient();
	        Charset charset = Charset.forName("UTF-8");//设置编码
	        try {
	            //2：创建http的发送方式对象，是GET还是post
	            HttpPost httppost = new HttpPost(url);

	            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
	            MultipartEntity reqEntity = new MultipartEntity();

	            FileBody bin = new FileBody(new File(filePath));
	            StringBody ips = new StringBody(ip,charset);
	            StringBody taskeIds = new StringBody(taskeId,charset);
	            StringBody users = new StringBody(user,charset);
	            StringBody passwords = new StringBody(password,charset);
	            
	            StringBody dbTypes = new StringBody(dbType,charset);
	            StringBody dburls = new StringBody(dburl,charset);
	           
	            StringBody signs = new StringBody(sign,charset);
	            
	            ArrayList<FileBody> fileBodys = new ArrayList();
	            fileBodys.add(bin);

	            addFileBodyPart("sqlText", fileBodys, reqEntity);
	            reqEntity.addPart("ip", ips);
	            reqEntity.addPart("taskeId", taskeIds);
	            reqEntity.addPart("user", users);
	            reqEntity.addPart("passward", passwords);
	            
	            reqEntity.addPart("dbType", dbTypes);
	            reqEntity.addPart("url", dburls);
	        
	            
	            reqEntity.addPart("sign", signs);
	            httppost.setEntity(reqEntity);

	            //4：执行httppost对象，从而获得信息
	            HttpResponse response = httpclient.execute(httppost);
	            HttpEntity resEntity = response.getEntity();

	            //获得返回来的信息，转化为字符串string
	            String resString = EntityUtils.toString(resEntity);
	            
	            return resString;

	        } catch (UnsupportedEncodingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IllegalStateException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } finally {
	            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
	        }
	    }
	 
	 
	 public static String httpPostRemote(String url,Map<String,String> map){
	        //1:创建一个httpclient对象
	        HttpClient httpclient = new DefaultHttpClient();
	        Charset charset = Charset.forName("UTF-8");//设置编码
	        try {
	            //2：创建http的发送方式对象，是GET还是post
	            HttpPost httppost = new HttpPost(url);

	            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
	            MultipartEntity reqEntity = new MultipartEntity();

	            for(String key:map.keySet()){
	            	 StringBody stringBody = new StringBody(map.get(key),charset);
	            	 reqEntity.addPart(""+key, stringBody);
	            }
	         
	            httppost.setEntity(reqEntity);

	            //4：执行httppost对象，从而获得信息
	            HttpResponse response = httpclient.execute(httppost);
	            HttpEntity resEntity = response.getEntity();

	            //获得返回来的信息，转化为字符串string
	            String resString = EntityUtils.toString(resEntity);
	            
	            return resString;

	        } catch (UnsupportedEncodingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IllegalStateException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } finally {
	            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
	        }
	    }
	 
	
	 public static String httpPostFile(String url,String filePath,String ip,String taskeId,String basePath,String command,String sign){
	        //1:创建一个httpclient对象
	        HttpClient httpclient = new DefaultHttpClient();
	        Charset charset = Charset.forName("UTF-8");//设置编码
	        try {
	            //2：创建http的发送方式对象，是GET还是post
	            HttpPost httppost = new HttpPost(url);

	            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
	            MultipartEntity reqEntity = new MultipartEntity();

	            FileBody bin = new FileBody(new File(filePath));
	            StringBody ips = new StringBody(ip,charset);
	            StringBody taskeIds = new StringBody(taskeId,charset);
	            StringBody basePaths = new StringBody(basePath,charset);
	            StringBody commands = new StringBody(command,charset);
	            StringBody signs = new StringBody(sign,charset);
	            
	            ArrayList<FileBody> fileBodys = new ArrayList();
	            fileBodys.add(bin);

	            addFileBodyPart("file", fileBodys, reqEntity);
	            reqEntity.addPart("ip", ips);
	            reqEntity.addPart("taskeId", taskeIds);
	            reqEntity.addPart("basePath", basePaths);
	            reqEntity.addPart("command", commands);
	            reqEntity.addPart("sign", signs);
	            httppost.setEntity(reqEntity);

	            //4：执行httppost对象，从而获得信息
	            HttpResponse response = httpclient.execute(httppost);
	            HttpEntity resEntity = response.getEntity();

	            //获得返回来的信息，转化为字符串string
	            String resString = EntityUtils.toString(resEntity);
	            
	            return resString;

	        } catch (UnsupportedEncodingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IllegalStateException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            return "";
	        } finally {
	            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
	        }
	    }

	    //当多个文件需要上传时，对文件进行组装
	    public static void addFileBodyPart(String paramName, ArrayList<FileBody> fileBodys, MultipartEntity reqEntity){
	        if(fileBodys == null || fileBodys.size() < 1 || reqEntity == null || paramName == null){
	            return;
	        }
	        for(FileBody iteam : fileBodys){
	            reqEntity.addPart(paramName,iteam);
	        }
	    }

	/**
	* 向指定URL发送POST方法的请求
	* @param url 发送请求的URL
	* @param params 请求参数，请求参数应该是name1=value1&name2=value2的形式。
	* @return URL所代表远程资源的响应
	*/
	public static String sendPost(String url, String params){
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try{
			TrustManager[] tm = { new TrustAnyTrustManager() };
			SSLContext sc = SSLContext.getInstance("SSL", "SunJSSE");
			sc.init(null, tm, new java.security.SecureRandom());
			
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
//			URLConnection conn = realUrl.openConnection();
			HttpsURLConnection conn = (HttpsURLConnection) realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
			conn.setSSLSocketFactory(sc.getSocketFactory());
			conn.setHostnameVerifier(new TrustAnyHostnameVerifier());
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(params);  //②
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null){
				result += "\n" + line;
			}
		}catch (Exception e){
			System.out.println("发送POST请求出现异常！" + e);
			e.printStackTrace();
		}finally{
			// 使用finally块来关闭输出流、输入流
			try{
				if (out != null){
					out.close();
				}
				if (in != null){
					in.close();
				}
			}catch (IOException ex){
				ex.printStackTrace();
			}
		}
		return result;
	}

	private static class TrustAnyHostnameVerifier implements HostnameVerifier {
		public boolean verify(String hostname, SSLSession session) {
			return true;
		}
	}
	
	private static class TrustAnyTrustManager implements X509TrustManager {
		public void checkClientTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
		}

		public void checkServerTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
		}

		public X509Certificate[] getAcceptedIssuers() {
			return new X509Certificate[] {};
		}
	}
	
	/**
	 * 登录
	 * @param url
	 * @param loginname
	 * @param password
	 * @param keyWord
	 * @return
	 */
	public static String httpPost(String url,String loginname,String password,String keyWord){
        //1:创建一个httpclient对象
        HttpClient httpclient = new DefaultHttpClient();
        Charset charset = Charset.forName("UTF-8");//设置编码
        try {
            //2：创建http的发送方式对象，是GET还是post
            HttpPost httppost = new HttpPost(url);

            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
            MultipartEntity reqEntity = new MultipartEntity();
            
            StringBody loginnames = new StringBody(loginname,charset);
            StringBody passwords = new StringBody(password,charset);
            StringBody keyWords = new StringBody(keyWord,charset);
            
            reqEntity.addPart("loginname", loginnames);
            reqEntity.addPart("password", passwords);
            reqEntity.addPart("keyWord", keyWords);
          
            httppost.setEntity(reqEntity);

            //4：执行httppost对象，从而获得信息
            HttpResponse response = httpclient.execute(httppost);
            HttpEntity resEntity = response.getEntity();

            //获得返回来的信息，转化为字符串string
            String resString = EntityUtils.toString(resEntity);
            
            return resString;

        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } finally {
            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
        }
    }
	
	/**
	 * 修改密码
	 * @param url
	 * @return
	 */
	public static String httpPost2(String url,String loginname,String oldPwd,String newPsw){
        //1:创建一个httpclient对象
        HttpClient httpclient = new DefaultHttpClient();
        Charset charset = Charset.forName("UTF-8");//设置编码
        try {
            //2：创建http的发送方式对象，是GET还是post
            HttpPost httppost = new HttpPost(url);

            //3：创建要发送的实体，就是key-value的这种结构，借助于这个类，可以实现文件和参数同时上传，很简单的。
            MultipartEntity reqEntity = new MultipartEntity();
            StringBody loginnames = new StringBody(loginname,charset);
            StringBody oldPwds = new StringBody(oldPwd,charset);
            StringBody newPsws = new StringBody(newPsw,charset);
            
            reqEntity.addPart("loginname", loginnames);
            reqEntity.addPart("oldPwd", oldPwds);
            reqEntity.addPart("newPsw", newPsws);
            httppost.setEntity(reqEntity);

            //4：执行httppost对象，从而获得信息
            HttpResponse response = httpclient.execute(httppost);
            HttpEntity resEntity = response.getEntity();

            //获得返回来的信息，转化为字符串string
            String resString = EntityUtils.toString(resEntity);
            
            return resString;

        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        } finally {
            try { httpclient.getConnectionManager().shutdown(); } catch (Exception ignore) {}
        }
    }
}
