package com.gavin.T.content.dao;

import com.gavin.T.content.bean.Content;
import com.gavin.T.core.MybatisBaseDao;

public class MybatisContentDaoImpl extends MybatisBaseDao<Content> implements IContentDao {

	@Override
	public Content findContents(Integer pageNo, Integer pageSize, String keyword) {
//		return (Content)getSession().createQuery("from Content where title=?").setString(0,keyword).setFirstResult(pageNo).setMaxResult(pageSize).uniueResult();
		return null;
	}
	

	
}
