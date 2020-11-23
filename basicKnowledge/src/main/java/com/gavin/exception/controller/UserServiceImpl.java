package com.gavin.exception.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UserServiceImpl implements IUserService {

	
	
	@Override
	public boolean saveUser() throws TzServiceException{
		int a = 1/0;//运行时异常
		return true;
	}
	
	
	public boolean saveu() throws SQLException, TzServiceException{
		UserServiceImpl userService = new UserServiceImpl();
		//runtime是不可以捕获的异常，只是为了程序调试方法，找到程序代码的出错的位置，而去捕获的异常，如此处理完毕以后，是可以删掉的
		//checked exception就不行
		try {
			boolean flag = userService.saveUser();
			System.out.println(flag);
			Connection connection = null;
			Statement statement = connection.createStatement();
			return flag;
		} catch (SQLException e) {
//			return false;
			throw e;//这样的做法就不方便记录错误的信息,自定义异常的目的    throw 抛出的异常如果是runtimeException就不用throws显示抛出
			//如果是checkedException就必须显示throws抛出，让调用者进行异常捕获
			//throw 可以解决返回值的问题，可以决定异常是不是让调用者去处理，方便记录和控制异常信息
			//只有在:RuntimeException和Exception类的情况下，用throw e抛出的话，不需要throws继续往上抛.
		}
	}

	public static void main(String[] args) {
		//throws 和 throw 永远都会有一个处理住，
		try {
			new UserServiceImpl().saveu();
		} catch (SQLException  e) {
			e.printStackTrace();
		} catch (TzServiceException e) {
		}
	}
	
}
