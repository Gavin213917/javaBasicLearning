package com.gavin.designModel.demo;

public class ConnectionFactory {

	
	/**
	 * 获取工程的连接对象的方法
	 * 方法名：createConnection<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月24日-上午12:57:34 <br/>
	 * 手机:1564545646464<br/>
	 * @param mark
	 * @return IConnection<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static IConnection createConnection(int mark){
		IConnection connection = null;
		if(mark==1){
			connection= new MysqlConnection();
		}else if(mark==2){
			connection=new OracleConnection();
		}
		return connection;
	}
	
}
