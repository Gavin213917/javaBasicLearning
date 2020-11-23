package com.gavin.designModel.demo2;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Properties;

/**
 * 
 * 
 * ParseProperties<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月24日-上午12:32:28 <br/>
 * @version 1.0.0<br/>
 *
 */
public class ParseProperties {

	//饿汉的单列模式
	private static ParseProperties parseProperties = new ParseProperties();
	//私有的构造函数
	private ParseProperties(){
	}
	//被外部调用的公开单列对象的方法
	public static ParseProperties getInstance(){
		return parseProperties;
	}
	
	   //在其他包中，不在当前路径的文件夹下
//		String rootPath = System.getProperty("user.dir");
//		File file = new File(rootPath+File.separator+"src","db.properties");
//		InputStream inputStream = new FileInputStream(file);
	
	/**
	 * 获取配置文件中的数据库的信息
	 * 方法名：getDBInfo<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月24日-上午12:51:16 <br/>
	 * 手机:1564545646464<br/>
	 * @param mark
	 * @return HashMap<String,String><br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public HashMap<String, String> getDBInfo(String mark){
		try {
			Properties properties = new Properties();
			//当前类以内可以这样
			InputStream inputStream = ParseProperties.class.getResourceAsStream("db.properties");
			properties.load(inputStream);
			String driver = properties.getProperty(mark+".driver");
			String url = properties.getProperty(mark+".url");
			String username = properties.getProperty(mark+".username");
			String password = properties.getProperty(mark+".password");
			
			HashMap<String,String> map = new HashMap<>();
			map.put("driver",driver);
			map.put("url",url);
			map.put("username",username);
			map.put("password",password);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 
	 * 方法名：getKey<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月24日-上午1:13:04 <br/>
	 * 手机:1564545646464<br/>
	 * @param key
	 * @return String<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static String getKey(String key){
		try {
			Properties properties = new Properties();
			//当前内以内可以这样
			InputStream inputStream = ParseProperties.class.getResourceAsStream("db.properties");
			properties.load(inputStream);
			return properties.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	
	
	public static void main(String[] args) throws IOException {
		ParseProperties parseProperties = ParseProperties.getInstance();
		HashMap<String, String> map = parseProperties.getDBInfo("mysql");
		try {
			Class.forName(map.get("driver"));
			Connection connection = DriverManager.getConnection(map.get("url"),map.get("username"),map.get("password"));
			System.out.println(connection);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
