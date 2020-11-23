package com.gavin.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

@FunctionalInterface
public interface ResultSetExtractor {
	
	//函数泛型
	public  Object extractData(ResultSet rs) throws SQLException; 
}
