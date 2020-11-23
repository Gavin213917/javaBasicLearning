package com.gavin.designModel.demo2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;

public class MysqlConnection implements IConnection{

	@Override
	public Connection getConnection() {
		ParseProperties parseProperties = ParseProperties.getInstance();
		HashMap<String, String> map = parseProperties.getDBInfo("mysql");
		try {
			Class.forName(map.get("driver"));
			Connection connection = DriverManager.getConnection(map.get("url"),map.get("username"),map.get("password"));
			return connection;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
