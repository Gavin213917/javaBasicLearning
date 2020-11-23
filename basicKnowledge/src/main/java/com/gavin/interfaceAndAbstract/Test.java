package com.gavin.interfaceAndAbstract;

public class Test {
	
	public static void main(String[] args) {
		IUserDao iUserDao = new IUserDaoImpl();
		iUserDao.hello();//共享的方法
		IUserDao.testcc();//静态的用类去调用
	}

}
