package com.gavin.T;

import com.gavin.T.content.dao.IContentDao;
import com.gavin.T.content.dao.MybatisContentDaoImpl;
import com.gavin.T.user.dao.IUserDao;
import com.gavin.T.user.dao.UserDaoImpl;

public class Test {


	public static void main(String[] args) {
//		ContentDaoImpl contentDaoImpl = new ContentDaoImpl();
//		contentDaoImpl.findContents(0, 10, "");
//		contentDaoImpl.save(object);
		
//		IContentDao contentDao = new ContentDaoImpl();
		IContentDao contentDao = new MybatisContentDaoImpl();
		contentDao.findContents(0, 10, "");
		contentDao.save(null);;
		
		IUserDao userDao  = new UserDaoImpl();
		userDao.getUserByUserName("","");
	}
	
}
