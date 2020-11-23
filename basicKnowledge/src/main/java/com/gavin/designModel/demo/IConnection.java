package com.gavin.designModel.demo;

import java.sql.Connection;

/**
 * 
 * 连接对象的接口 
 * IConnection<br/>
 * @version 1.0.0<br/>
 *
 */
public interface IConnection {

	
	/**
	 * 连接方法
	 * 方法名：getConnection<br/>
	 * @return Connection<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public Connection getConnection();
}
