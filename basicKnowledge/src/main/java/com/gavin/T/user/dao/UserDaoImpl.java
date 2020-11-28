package com.gavin.T.user.dao;

import com.gavin.T.core.BaseDao;
import com.gavin.T.core.IBaseDaoOther;
import com.gavin.T.user.bean.User;

public class UserDaoImpl extends BaseDao<User> implements IUserDao, IBaseDaoOther<User> {
	

	@Override
	public User getUserByUserName(String username, String password) {
		return null;
	}

	@Override
	public void screct() {

	}
	
	

}
