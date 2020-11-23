package com.gavin.designModel.demo2;

public abstract class ConnectionFactory {

	/**
	 * 获取工程的连接对象的方法 方法名：createConnection<br/>
	 * 
	 * @param
	 * @return IConnection<br/>
	 * @exception <br/>
	 * @since 1.0.0<br/>
	 */
	public abstract IConnection createConnection();

}
