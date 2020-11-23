package com.gavin.jdbc.dao;

import com.gavin.jdbc.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


/**
 * 
 * 建立数据的连接对象
 * ConnectionUtil
 * @version 1.0.0
 *
 */
public class ConnectionUtil {
	
	private static final String url = "jdbc:mysql://localhost:3306/jdbctest";
	private static final  String username = "root";
	private static final  String password = "xiaoer";
	
	
	/**
	 * 获取连接对象
	 * @Title: getConnection 
	 * @author: Gavin
	 * @time: 2019年7月24日 上午10:56:02
	 * @return 
	 * @return: Connection 
	 * @throws
	 */
	public static Connection getConnection(){
		try {
			Class.forName("com.mysql.jdbc.Driver");//静态代码块实例化一个Driver对象
			Connection connection = DriverManager.getConnection(url, username, password);
			return connection;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 
	 * @Title: closeConnection 
	 * @author: Gavin
	 * @time: 2019年7月24日 上午10:56:37
	 * @param connection
	 * @param statement
	 * @param rs 
	 * @return: void 
	 * @throws
	 */
	public static void closeConnection(Connection connection,PreparedStatement statement,ResultSet rs){
		try {
			if(rs!=null)rs.close();
			if(statement!=null)statement.close();
			if(connection!=null)connection.close();
		} catch (Exception e) {
			e.fillInStackTrace();
		}
	}
	
	/**
	 * 查詢用戶信息
	 * @Title: findUsers 
	 * @author: Gavin
	 * @time: 2019年7月24日 上午10:56:52
	 * @return 
	 * @return: List<User> 
	 * @throws
	 */
	public static List<User> findUsers(){
		Connection connection = null;
		PreparedStatement statement= null;
		ResultSet rs = null;
		List<User> users = null;
		try {
			connection = getConnection();
//		  3: 准备sql指令(select ,update ,insert delete)
			String sql = "SELECT username,id,age,address,telephone,birthday,intro FROM keke_user";
//		  4: 执行sql的预处理对象
			statement = connection.prepareStatement(sql);	
//		  5: 执行sql返回结果集
			rs = statement.executeQuery();//发送指令，执行sql,返回结果
//		  6: 结果集的解析，放入map或者bean中
			users = new ArrayList<>();
			User user = null;
			while(rs.next()){
				user = new User();//只初始化一次
				user.setId(rs.getInt("id"));
				user.setAge(rs.getInt("age"));
				user.setUsername(rs.getString("username"));
				user.setAddress(rs.getString("address"));
				user.setTelephone(rs.getString("telephone"));
				user.setBirthday(rs.getDate("birthday"));
				user.setIntro(rs.getString("intro"));
				users.add(user);
			}
			return users;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally{
			closeConnection(connection, statement, rs);
		}
	}
	
	
	
	//提前預習 insert update delete  搜索條件 ===jdbc封裝
	
	
	
	
	public static void main(String[] args) throws ClassNotFoundException {
		List<User> users = findUsers();
		for (User user : users) {
			System.out.println(user.getId()+"==="+user.getIntro());
		}
	}
	
	
	
	
	
	
}
