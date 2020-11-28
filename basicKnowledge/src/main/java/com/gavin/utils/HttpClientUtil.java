package com.gavin.utils;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.*;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.util.PublicSuffixMatcher;
import org.apache.http.conn.util.PublicSuffixMatcherLoader;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class HttpClientUtil {
	private final static Logger log = Logger.getLogger(HttpClientUtil.class);
	private RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(15000).setConnectTimeout(15000)
			.setConnectionRequestTimeout(15000).build();

	private static HttpClientUtil instance = null;

	private HttpClientUtil() {
	}

	public static HttpClientUtil getInstance() {
		if (instance == null) {
			instance = new HttpClientUtil();
		}
		ContentBody b;
		return instance;
	}

	/**
	 * 发送 post请求
	 * 
	 * @param httpUrl
	 *            地址
	 */
	public String sendHttpPost(String httpUrl) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost
		return sendHttpPost(httpPost);
	}

	/**
	 * 发送报问题传送参数请求 POST
	 * 
	 * @param httpUrl
	 * @param params
	 * @param httpUrl,params
	 * @return
	 */
	public String sendHttpPost(String httpUrl, String params) {
		HttpEntityEnclosingRequestBase httpReq = new HttpPost(httpUrl);;
		if (params != null) {
			try {
				// 设置参数
				StringEntity stringEntity = new StringEntity(params, "UTF-8");
				stringEntity.setContentType("application/json");
				httpReq.setEntity(stringEntity);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return sendHttpPost(httpReq);
	}

	/**
	 * 发送报问题传送参数请求 PUT
	 * 
	 * @param httpUrl
	 * @param params
	 * @param httpUrl,params
	 * @return
	 */
	public String sendHttpPut(String httpUrl, String params) {
		HttpEntityEnclosingRequestBase httpReq = new HttpPut(httpUrl);
		if (params != null) {
			try {
				// 设置参数
				StringEntity stringEntity = new StringEntity(params, "UTF-8");
				stringEntity.setContentType("application/json");
				httpReq.setEntity(stringEntity);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return sendHttpPost(httpReq);
	}

	/**
	 * 发送 post请求
	 * 
	 * @param httpUrl
	 *            地址
	 * @param maps
	 *            参数
	 */
	public String sendHttpPost(String httpUrl, Map<String, String> maps) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost
		// 创建参数队列
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		for (String key : maps.keySet()) {
			nameValuePairs.add(new BasicNameValuePair(key, maps.get(key)));
		}
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sendHttpPost(httpPost);
	}

	/**
	 * 发送 post请求（带文件）
	 * 
	 * @param httpUrl
	 *            地址
	 * @param maps
	 *            参数
	 * @param fileLists
	 *            附件
	 */
	public String sendHttpPost(String httpUrl, Map<String, String> maps, List<File> fileLists) {
		HttpPost httpPost = new HttpPost(httpUrl);// 创建httpPost
		MultipartEntityBuilder meBuilder = MultipartEntityBuilder.create();
		for (String key : maps.keySet()) {
			meBuilder.addPart(key, new StringBody(maps.get(key), ContentType.TEXT_PLAIN));
		}
		for (File file : fileLists) {
			FileBody fileBody = new FileBody(file);
			meBuilder.addPart("files", fileBody);
		}
		HttpEntity reqEntity = meBuilder.build();
		httpPost.setEntity(reqEntity);
		return sendHttpPost(httpPost);
	}

	/**
	 * 发送Post请求
	 * 
	 * @param httpPost
	 * @return
	 */
	private String sendHttpPost(HttpEntityEnclosingRequestBase httpPost) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		String responseContent = null;
		try {
			// 创建默认的httpClient实例.
			httpClient = HttpClients.createDefault();
			httpPost.setConfig(requestConfig);
			// 执行请求
			response = httpClient.execute(httpPost);
			entity = response.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭连接,释放资源
				if (response != null) {
					response.close();
				}
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return responseContent;
	}

	/**
	 * 发送 get请求带参数
	 * 
	 * @param httpUrl
	 * @throws IOException
	 * @throws UnsupportedEncodingException
	 * @throws ParseException
	 */
	public String sendHttpGet(String httpUrl, Map<String, String> param)
			throws ParseException, UnsupportedEncodingException, IOException {
		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
		for (String key : param.keySet()) {
			nameValuePairs.add(new BasicNameValuePair(key, param.get(key)));
		}
		String str = EntityUtils.toString(new UrlEncodedFormEntity(nameValuePairs, "UTF-8"));
		System.out.println(str);
		HttpGet httpGet = new HttpGet(httpUrl + "?" + str);// 创建get请求
		return sendHttpGet(httpGet);
	}

	/**
	 * 发送 get请求
	 * 
	 * @param httpUrl
	 * @throws IOException
	 * @throws UnsupportedEncodingException
	 * @throws ParseException
	 */
	public String sendHttpGet(String httpUrl) throws ParseException, UnsupportedEncodingException, IOException {
		HttpRequestBase httpGet = new HttpGet(httpUrl);// 创建get请求
		return sendHttpGet(httpGet);
	}

	/**
	 * 发送 DELETE请求
	 * 
	 * @param httpUrl
	 * @throws IOException
	 * @throws UnsupportedEncodingException
	 * @throws ParseException
	 */
	public String sendHttpDelete(String httpUrl) throws ParseException, UnsupportedEncodingException, IOException {
		HttpRequestBase httpDelete = new HttpDelete(httpUrl);// 创建httpDelete请求
		return sendHttpGet(httpDelete);
	}

	/**
	 * 发送 get请求Https
	 * 
	 * @param httpUrl
	 */
	public String sendHttpsGet(String httpUrl) {
		HttpGet httpGet = new HttpGet(httpUrl);// 创建get请求
		return sendHttpsGet(httpGet);
	}

	/**
	 * 发送Get请求
	 * 
	 * @param httpGet
	 * @return
	 */
	private String sendHttpGet(HttpRequestBase httpGet) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		String responseContent = null;
		try {
			// 创建默认的httpClient实例.
			httpClient = HttpClients.createDefault();
			httpGet.setConfig(requestConfig);
			// 执行请求
			response = httpClient.execute(httpGet);
			entity = response.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭连接,释放资源
				if (response != null) {
					response.close();
				}
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return responseContent;
	}

	/**
	 * 发送Get请求Https
	 * 
	 * @param httpGet
	 * @return
	 */
	private String sendHttpsGet(HttpGet httpGet) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		HttpEntity entity = null;
		String responseContent = null;
		try {
			// 创建默认的httpClient实例.
			PublicSuffixMatcher publicSuffixMatcher = PublicSuffixMatcherLoader
					.load(new URL(httpGet.getURI().toString()));
			DefaultHostnameVerifier hostnameVerifier = new DefaultHostnameVerifier(publicSuffixMatcher);
			httpClient = HttpClients.custom().setSSLHostnameVerifier(hostnameVerifier).build();
			httpGet.setConfig(requestConfig);
			// 执行请求
			response = httpClient.execute(httpGet);
			entity = response.getEntity();
			responseContent = EntityUtils.toString(entity, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭连接,释放资源
				if (response != null) {
					response.close();
				}
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return responseContent;
	}

	public static void main(String[] args) throws ParseException, UnsupportedEncodingException, IOException {
		HttpClientUtil client = HttpClientUtil.getInstance();
		Map<String, String> param = new HashMap<String, String>();
		param.put("a", "111");
		param.put("bbbb", "d111");
		String r = client.sendHttpGet("http://127.0.0.1:8888/monitorCenter-bzglFront/service/state/collect/queryUpdateTask",
				param);
		System.out.println(r);

	}

}