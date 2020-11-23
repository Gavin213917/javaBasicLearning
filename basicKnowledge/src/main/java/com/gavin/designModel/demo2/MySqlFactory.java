package com.gavin.designModel.demo2;

public class MySqlFactory extends ConnectionFactory{

	@Override
	public IConnection createConnection() {
		return new MysqlConnection();
	}
}
