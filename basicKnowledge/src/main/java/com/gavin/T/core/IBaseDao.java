package com.gavin.T.core;

import java.util.List;

public interface IBaseDao<T> {
	
	public void save(T object);

	public void update(T object);

	public void delete(T object);

	public T get(Integer id);

	public List<T> findAll(Integer id);
	
}
