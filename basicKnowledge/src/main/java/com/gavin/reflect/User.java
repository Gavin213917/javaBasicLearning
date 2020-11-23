package com.gavin.reflect;

import java.io.Serializable;




@KeKeMapping(desc="用户管理类")
public class User implements Serializable{
		
	//属性，成员属性和成员方法
	private Integer id;
	@KeKeMapping(desc="用户名",def="keke")
	private String username;
	@KeKeMapping(desc="金额",def="0")
	private Float money;
	private String[] teachers;
	private Long num;
	
	//构造函数
	@KeKeMapping(desc="我是构造函数")
	public User(){
		super();
	}
	
	public User(Integer id, String username, Float money, String[] teachers, Long num) {
		super();
		this.id = id;
		this.username = username;
		this.money = money;
		this.teachers = teachers;
		this.num = num;
	}

	
	@KeKeMapping(desc="主键",def="1",value="123456")
	public Integer getId() {
		return id;
	}

	public void setId(@KeKeMapping("123456789") Integer id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Float getMoney() {
		return money;
	}

	public void setMoney(Float money) {
		this.money = money;
	}

	public String[] getTeachers() {
		return teachers;
	}

	public void setTeachers(String[] teachers) {
		this.teachers = teachers;
	}

	public Long getNum() {
		return num;
	}

	public void setNum(Long num) {
		this.num = num;
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
	
	
	class Inner{
		
	}

}
