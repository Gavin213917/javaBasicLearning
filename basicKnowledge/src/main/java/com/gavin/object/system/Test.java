package com.gavin.object.system;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

import com.hp.hpl.sparta.xpath.ThisNodeTest;
import com.sun.corba.se.impl.protocol.giopmsgheaders.Message;

public class Test {

	
	//国际化---根据操作系统语言进行文字切换，比如英国--英文展示，中国--中文展示
	
	/*
	 * 1:三个类完成--国际化操作
	 * b:java.util.ResourceBundle :用于加载国家，语言的资源包
	 * a:java.util.Locale  封装特定的国际/区域，语言环境
	 * c:java.util.MessageFormat  格式化的占位符的替换
	 * 
	 * 
	 * 未来struts2 spring中框架都遇到国际化的问题，其他们都是对这个三个类的封装，
	 * 必须还有国际化的资源文件：格式如下几种：
	 * 
	 * 1:baseName_language_country.properties
	 * 2:baseName_language.properties
	 * 3:baseName.properties
	 * 
	 * baseName是资源文件的名称，用户可以随意设定，而language和country不可以随便随便设定，
	 * 比如：message_zh_CN.properties
	 * 	    message_en_US.properties
	 * 
	 * */
	
	public void parseMessage(Locale locale){
		ResourceBundle resourceBundle = ResourceBundle.getBundle(this.getClass().getPackage().getName()+".message", locale);
		//获取值
		String username = resourceBundle.getString("a");
//		String username2 = resourceBundle.getString("b");
//		String username3 = resourceBundle.getString("c");
//		String username4 = resourceBundle.getString("d");
//		String username5 = resourceBundle.getString("e");
//		String username6 = resourceBundle.getString("f");
//		String username7 = resourceBundle.getString("g");
//		String username8 = resourceBundle.getString("h");
		System.out.println(username);
//		System.out.println(username2);
//		System.out.println(username3);
//		System.out.println(username4);
//		System.out.println(username5);
//		System.out.println(username6);
//		System.out.println(username7);
//		System.out.println(username8);

		
//		String newUsername = MessageFormat.format(username, "keke","心情不错!!!");
//		System.out.println(newUsername);
		
	}
	
	
	public static void main(String[] args) {
//		System.out.println(Locale.CANADA);
//		System.out.println(Locale.CHINA);
//		System.out.println(Locale.CHINESE);
		
//		Locale[] locales =Locale.getAvailableLocales();
//		for (Locale locale : locales) {
//			System.out.println(locale.getLanguage()+"=="+locale.getCountry()+"==="+locale.getDisplayCountry());
//		}
		
//		获取当前本机的国家和语言坏境
		
//		 new Test().parseMessage(Locale.ENGLISH);//en
		 new Test().parseMessage(Locale.US);//en_US
//		 new Test().parseMessage(Locale.CHINA);//zh_CN
		
//		String template = "我是{0}，几年{1}岁，现在住在{2}";
//		String templates = MessageFormat.format(template, "keke",30,"湖南长沙");//替换
//		System.out.println(templates);
		
		
	}
	
	
	
}
