package com.gavin.T.content.dao;

import com.gavin.T.content.bean.Content;
import com.gavin.T.core.IBaseDao;

public interface IContentDao extends IBaseDao<Content>{

	
	
	public Content findContents(Integer pageNo, Integer pageSize, String keyword);
	
}
