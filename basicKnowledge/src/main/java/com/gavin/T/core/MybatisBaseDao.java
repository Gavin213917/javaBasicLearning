package com.gavin.T.core;

import java.util.List;

public class MybatisBaseDao<T> {

//	private Session session;  spring工厂里面来
//  private SqlSessionFactory sessionFactory;//set 构造函数
//  private Class clz;
	
//applicationContext.xml	
//	<bean id="sessionFactory" class="org.spring.LocalSessionFactoryBean">
//	<bean id="baseDao" class="com.tz.op29.core.BaseDao">
//		<property name="sessionFactory" ref="sessionFactory">
//	</bean>
	
	
//	public Session getSession(){
//		return sessionFactory.getSession();
//	}
//	
	
	public void save(T object){
		//session.save(object);
	}
	
	public void update(T object){
		//session.update(object);
	}
	
	
	public void delete(T object){
		//session.delete(object);
	}
	
	public T get(Integer id){
		//(T)session.get(Content.class,id);
		return null;
	}
	
	
	public List<T> findAll(Integer id){
		//可以
		//session.createQuery("from "+clz.getClass().getName().list();
		return null;
	}
}
