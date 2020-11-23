package com.gavin.socket.chat.net;

import java.net.URLDecoder;
import java.net.URLEncoder;

public class URLEncoderDecoderDemo {

	
	public static void main(String[] args) {
		
		try {
			
//			String link = "https://alimarket.taobao.com/markets/alimama/amp?wh_cat=nvxie&wh_shop=%E6%B1%9F%E5%8D%97%E5%85%88%E7%94%9F%E6%97%97%E8%88%B0%E5%BA%97&qq-pf-to=pcqq.c2c&ali_trackid=17_c133ff6ee06f0efc1ed767fa37c462cf&spm=a21bo.50862.201862-3.1.LJf6WQ";
//			String link = "http://www.baidu.com/?q=%E6%9F%AF%E6%9F%AF";
			String link = "http%3A%2F%2Fwww.baidu.com%2F%3Fq%3D%E6%9F%AF%E6%9F%AF%26u%3D23423";
			String decoderString = URLDecoder.decode(link,"UTF-8");//gbk,gb2312
			System.out.println(decoderString);
			
			String link2 = "http://www.baidu.com/?username=柯柯";
			String url = URLEncoder.encode(link2, "UTF-8");
			System.out.println(url);
			
		}  catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
