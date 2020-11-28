package com.gavin.T.user.dao;

import com.gavin.T.core.IBaseDao;
import com.gavin.T.user.bean.User;

public interface IUserDao extends IBaseDao<User> {

	public User getUserByUserName(String username, String password);
	

}
