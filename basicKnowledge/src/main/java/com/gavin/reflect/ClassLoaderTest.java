package com.gavin.reflect;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.SQLException;
import java.util.Properties;



public class ClassLoaderTest {
	
	
	public static void main(String[] args) throws ClassNotFoundException, MalformedURLException, InstantiationException, IllegalAccessException, SQLException {
		/*
		 * JVM:启动的时候，会形成三个类加载器组成的初始化类，层次结构是：
		 * Bootstrap ClassLoader 根加载器
		 * 	 它主要负责加载Java的核心类，在sun的jvm中，当执行java.exe命令时，它会去执行对应的类文件
		 *   它不是Java.lang.ClassLoader的子类 ,而是有jvm自身实现的，
		 * Extension ClassLoader  扩展加载器
		 * 	它是负责jre扩展目录里面jar包
		 * System Loader ClassLoader 系统类加载器
		 * 也被称为类加载器，它负责在jvm启动的时候加载来自java命令的classpath选择的系统
		 * 数据，
		 * 它会把classPath环境目录下面所指定的jar包和类文件全部加载系统系统加载中
		 * 典型的子类：AppClassLoader
		 * 
		 * 
		 * URLClassLoader: AppClassLoader和ExtClassLoader都是该类的实例.
		 * 
		 * 
			import java.lang.*;  Math的静态类,特殊包：封装数据类型，线程,类加载器，异常，反射，注解，内存管理,对象的生命周期监控类
			//java.lang下面的包是不需要直接导入的 rt.jar中
			
		 	import java.io.*; 文件操作
			import java.nio.*; 文件操作
			import java.util.*; 集合，Map,日期等等
			import java.text.*; 数字处理，日期处理.
			import java.net.*; 网络(爬虫，网络文件下载，聊天室)
			import java.sql.*; jdbc操作数据库
			import java.security.*; //加密、解密
			import java.math.*;BigDecimal,BigInteger;
			import javax.naming.*;(命名空间) rmi 本地服务
			import org.w3c.dom.*; (xml解析)--标准体系- jdom/dom4j/sax/jsoup都可以操作xml文件--rss订阅、webservice都是通过xml进行数据的传输
			import java.awt.*;//验证码，图片处理，图像的制作等---开发一个简单的photoshop ocr图片解析(扫描图片中的数字和英文)
			
		 * */
		
		/**
		 *  file:/D:/developTools/jdk1.8.0_65/jre/lib/resources.jar
			file:/D:/developTools/jdk1.8.0_65/jre/lib/rt.jar --string\integer\object
			file:/D:/developTools/jdk1.8.0_65/jre/lib/sunrsasign.jar
			file:/D:/developTools/jdk1.8.0_65/jre/lib/jsse.jar
			file:/D:/developTools/jdk1.8.0_65/jre/lib/jce.jar
			file:/D:/developTools/jdk1.8.0_65/jre/lib/charsets.jar
			file:/D:/developTools/jdk1.8.0_65/jre/lib/jfr.jar
			file:/D:/developTools/jdk1.8.0_65/jre/classes
		 * 
		 * 
		 */
		URL[] urls = sun.misc.Launcher.getBootstrapClassPath().getURLs();
		for (URL url : urls) {
			System.out.println(url.toExternalForm());
		}
		
//		ClassLoader classLoader = ClassLoader.getSystemClassLoader();
//		System.out.println(classLoader);
		
		
		
		
//		Class类是jvm提供给程序代码去解析的一个类,去模拟类加载器去解析字节文件的过程---反射
//		System.out.println(ClassLoaderTest.class);//等价于下面的代码
//		Class clz = Class.forName("com.tz.op27.ClassLoaderTest");
//		System.out.println(clz);
		
		//G:\Java基础班视频\Java面向对象类和对象\JavaOp
//		System.out.println(System.getProperty("user.dir"));
		
		
		
		//每个类加载之后都会生成一个class对象，通过改class对象可以访问jvm虚拟机的这个类的信息，构造函数，属性，方法，参数，注解等等
//		URL[] urls = {new URL("file:d:/mysql-connector-java-5.1.6-bin.jar")};
//		URLClassLoader urlClassLoader = new URLClassLoader(urls);
//		Driver driver = (Driver) urlClassLoader.loadClass("com.mysql.jdbc.Driver").newInstance();
//		Properties properties = new Properties();
//		properties.setProperty("user", "root");
//		properties.setProperty("password", "xiaoer");
//		Connection connection = driver.connect("jdbc:mysql://localhost:3306/kekeblog?useUnicode=true&characterEncoding=utf8",properties);
//		System.out.println(connection);
		
		
	}
	
}
