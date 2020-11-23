package com.gavin.jdbc;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.gavin.string.StringUtils;







public class Session {

	
	private static final String url = "jdbc:mysql://localhost:3306/jdbctest?useUnicode=true&characterEncoding=utf8";
	private static final  String username = "root";
	private static final  String password = "xiaoer";
	
	private static Session session = null;
	private Session(){
		
	}
	
	public static Session getInstance(){
		if(session==null)session=new Session();
		return session;
	}
	
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
	
	
//	public <T>T queryBean(String sql,ResultSetExtractor extractor){
//		Connection connection  = null;
//		PreparedStatement statement  = null;
//		ResultSet rs = null;
//		try {
//			//获取连接对象
//			connection = getInstance().getConnection();
//			//执行预处理对象
//			statement = connection.prepareStatement(sql);
//			//结果集
//			rs = statement.executeQuery();
//			rs.next();//这行代码别忘记了?
//			return (T)extractor.extractData(rs);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		} finally {
//			getInstance().closeConnection(connection, statement, rs);
//		}
//	}
//	
	
	/**
	 * 带有参数的封装
	 * 方法名：query<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年6月2日-下午10:48:21 <br/>
	 * 手机:1564545646464<br/>
	 * @param sql
	 * @param extractor
	 * @param params
	 * @return T<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public <T>T queryBean(String sql,ResultSetExtractor extractor,Object...params){
		Connection connection  = null;
		PreparedStatement statement  = null;
		ResultSet rs = null;
		try {
			//获取连接对象
			connection = getInstance().getConnection();
			//执行预处理对象
			statement = connection.prepareStatement(sql);
			//设置参数
			if(params!=null && params.length>0){
				for (int i = 0; i < params.length; i++) {
					statement.setObject(i+1, params[i]);
				}
			}
			//结果集
			rs = statement.executeQuery();
			rs.next();//这行代码别忘记了?
			return (T)extractor.extractData(rs);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			getInstance().closeConnection(connection, statement, rs);
		}
	}
	
	
	/**
	 * 查询多条数据
	 * 方法名：queryList<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年6月2日-下午10:51:50 <br/>
	 * 手机:1564545646464<br/>
	 * @param sql
	 * @param extractor
	 * @param params
	 * @return List<T><br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public <T>List<T> queryList(String sql,ResultSetExtractor extractor,Object...params){
		Connection connection  = null;
		PreparedStatement statement  = null;
		ResultSet rs = null;
		List<T> lists = null;
		try {
			//获取连接对象
			connection = getInstance().getConnection();
			//执行预处理对象
			statement = connection.prepareStatement(sql);
			//设置参数
			if(params!=null && params.length>0){
				for (int i = 0; i < params.length; i++) {
					statement.setObject(i+1, params[i]);
				}
			}
			//结果集
			rs = statement.executeQuery();
			lists = new ArrayList<>();
			while(rs.next()){
				lists.add((T)extractor.extractData(rs));
			}
			return lists;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			getInstance().closeConnection(connection, statement, rs);
		}
	}
	
	
	

	/**
	 * 查询多条数据
	 * 方法名：queryList<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年6月2日-下午10:51:50 <br/>
	 * 手机:1564545646464<br/>
	 * @param sql
	 * @param extractor
	 * @param params
	 * @return List<T><br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public <T>List<T> queryList(String sql,Class clz,Object...params){
		Connection connection  = null;
		PreparedStatement statement  = null;
		ResultSet rs = null;
		List<T> lists = null;
		try {
			//获取连接对象
			connection = getInstance().getConnection();
			//执行预处理对象
			statement = connection.prepareStatement(sql);
			//设置参数
			if(params!=null && params.length>0){
				for (int i = 0; i < params.length; i++) {
					statement.setObject(i+1, params[i]);
				}
			}
			//结果集
			rs = statement.executeQuery();
			//获取一个结果集的分析类
			ResultSetMetaData metaData = rs.getMetaData();
			//拿到获取sql语句 select ***from 这段的列明
			int count = metaData.getColumnCount();
			//定义个集合存储这些列名
			LinkedList<String> colunmNams = new LinkedList<>();
			for (int i = 0; i < count; i++) {
				colunmNams.add(metaData.getColumnName(i+1));//解析存储
			}
			//定义容器，装载数据
			lists = new ArrayList<>();
			while(rs.next()){
				//实例化对象
				T obj = (T)clz.newInstance();
				for (String string : colunmNams) {
					//将数据库对应的列名转换成javabean中对应的属性名，toUpperCaseFirst()首字母转大小,因为setUsername
					//columnToProperty()讲数据库列名转换成驼峰命名规则，create_time ---createTime
					//create_time --columnToProperty--createTime--toUpperCaseFirst---CreateTime
					String cname = StringUtils.toUpperCaseFirst(ColumnToPropertyUtil.columnToProperty(string));
					//调用反射，给属性赋值
					ReflectUtil.setValue(cname, rs.getObject(string), obj);
				}
				//讲数据集合中
				lists.add(obj);
			}
			//返回
			return lists;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			getInstance().closeConnection(connection, statement, rs);
		}
	}
	
	public static void main(String[] args) {
		//1：导入mysql的驱动包
		//定义连接类
		Session session = Session.getInstance();
//		Session session2 = Session.getInstance();
//		System.out.println(session.getConnection());
		
//		User user = session.queryBean("SELECT username,age,address FROM keke_user WHERE id = ?", new ResultSetExtractor() {
//			@Override
//			public  User extractData(ResultSet rs) throws SQLException {
//				User user = new User();
//				user.setUsername(rs.getString("username"));
//				user.setAge(rs.getInt("age"));
//				user.setAddress(rs.getString("address"));
//				return user;
//			}
//		},2);
		
//		String sql = "SELECT username,age,address FROM keke_user where age >= ? and username like ?";
//		List<User> users = session.queryList(sql, new ResultSetExtractor() {
//			@Override
//			public  User extractData(ResultSet rs) throws SQLException {
//				User user = new User();
//				user.setUsername(rs.getString("username"));
//				user.setAge(rs.getInt("age"));
//				user.setAddress(rs.getString("address"));
//				return user;
//			}
//		},30,"%柯%");
		
		
//		List<User> users2 =session.queryList(sql, rs->{
//			User u = new User();
//			u.setUsername(rs.getString("username"));
//			u.setAge(rs.getInt("age"));
//			u.setAddress(rs.getString("address"));
//			return u;
//		},30,"%柯%") ;
//		
//		
//		for (User user : users2) {
//			System.out.println(user.getUsername()+"==="+user.getAddress());
//		}
		
		
		String sql = "SELECT id,username,age,address,create_time FROM keke_user where age >= ? and username like ?";
		List<User> users2 =session.queryList(sql,User.class,30,"%1%") ;
		for (User user : users2) {
			System.out.println(user.getUsername()+"==="+user.getAddress()+"==="+user.getCreateTime());
		}
		
	}
}
