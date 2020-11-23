package com.gavin.lambda.jdbc;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;





public class QuerySession {

	
	private static final String url = "jdbc:mysql://localhost:3306/jdbctest?useUnicode=true&characterEncoding=utf8";
	private static final  String username = "root";
	private static final  String password = "xiaoer";
	
	
	/**
	 * 獲取連接對象
	 * 方法名：getConnection
	 * 创建人：xuchengfei 
	 * 时间：2016年5月28日-下午10:45:15 
	 * 手机:1564545646464
	 * @return Connection
	 * @exception 
	 * @since  1.0.0
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
	
	public <T>T  queryForObject(String sql,RowMapper mapper){
		try {
			Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(sql);
			ResultSet rs = statement.executeQuery();
			rs.next();
			ResultSetMetaData resultSetMetaData = rs.getMetaData();
			int count = resultSetMetaData.getColumnCount();
			for (int i = 0; i < count; i++) {
				System.out.println(resultSetMetaData.getColumnName(i+1)+"===>"+rs.getObject(resultSetMetaData.getColumnName(i+1)));
			}
			return (T)mapper.mapRow(rs);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public <T>T  queryForObject(String sql,RowMapper mapper,Object...params){
		try {
			Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(sql);
			if(params!=null && params.length>0){
				for (int i = 0; i < params.length; i++) {
					Object object = params[i];
					statement.setObject(i+1, params[i]);
				}
			}
			ResultSet rs = statement.executeQuery();
			rs.next();
			ResultSetMetaData resultSetMetaData = rs.getMetaData();
			int count = resultSetMetaData.getColumnCount();
			for (int i = 0; i < count; i++) {
				System.out.println(resultSetMetaData.getColumnName(i+1)+"===>"+rs.getObject(resultSetMetaData.getColumnName(i+1)));
			}
			return (T)mapper.mapRow(rs);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	/**
	 * 
	 * 方法名：closeConnection
	 * 创建人：xuchengfei 
	 * 时间：2016年5月28日-下午10:52:05 
	 * 手机:1564545646464
	 * @param connection
	 * @param statement
	 * @param rs void
	 * @exception 
	 * @since  1.0.0
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

	
	public static void closeConnection(Connection connection,PreparedStatement statement){
		try {
			if(statement!=null)statement.close();
			if(connection!=null)connection.close();
		} catch (Exception e) {
			e.fillInStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
//		 User user = new QuerySession().queryForObject("select username,age from keke_user where id =1", new RowMapper<User>() {
//			@Override
//			public User  mapRow(ResultSet rs, int index) throws SQLException {
//				User user = new User();
//				user.setUsername(rs.getString("username"));
//				user.setAge(rs.getInt("age"));
//				return user;
//			}
//		});
//		
//		System.out.println(user.getUsername());
//		System.out.println(user.getAge());
		
		//模拟spring的springjdbctemplate List update 反射 coutil
		User user = new QuerySession().queryForObject("select username,age from keke_user where username like ?", (rs)->{
			User user2 = new User();
			user2.setUsername(rs.getString("username"));
			user2.setAge(rs.getInt("age"));
			return user2;
		},"%柯%");
		System.out.println(user.getUsername());
		System.out.println(user.getAge());
		
		
		//封装--insert delete update
		try {
			CallableStatement statement = getConnection().prepareCall("{CALL add_user(?)}");
			statement.registerOutParameter(1,Types.INTEGER);
			statement.execute();
			System.out.println(statement.getInt(1));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	}
}
