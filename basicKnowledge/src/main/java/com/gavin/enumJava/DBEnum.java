package com.gavin.enumJava;

public enum DBEnum {
	MYSQL("com.mysql.jdbc.Driver","jdbc:mysql://localhost:3306/db","root","xiaoer"),
	ORACLE("com.oracle.jdbc.Driver","jdbc:mysql://localhost:3306/db","root","xiaoer");
	
	//私有构造函数
	private DBEnum(String driver,String url,String username,String password){
		this.driver = driver;
		this.url = url;
		this.username = username;
		this.password = password;
	}
	
	private String driver;
	private String url;
	private String username;
	private String password;
	public String getDriver() {
		return driver;
	}
	public String getUrl() {
		return url;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	
	
	
}
