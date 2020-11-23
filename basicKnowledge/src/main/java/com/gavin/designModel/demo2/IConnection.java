package com.gavin.designModel.demo2;

import java.sql.Connection;

/**
 * 
 * 连接对象的接口 
 * IConnection<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月24日-上午12:54:38 <br/>
 * @version 1.0.0<br/>
 *
 */
public interface IConnection {

	
	/**
	 * 连接方法
	 * 方法名：getConnection<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月24日-上午12:54:45 <br/>
	 * 手机:1564545646464<br/>
	 * @return Connection<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public Connection getConnection();
}
