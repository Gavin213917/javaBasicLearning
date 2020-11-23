package com.gavin.jdbc.bean;

/**
 * 
 * 參數類
 * TzParams
 * 创建人:xuchengfei 
 * 时间：2016年6月1日-下午10:27:54 
 * @version 1.0.0
 *
 */
public class TzParams {

	private Integer age;
	private String username;
	private Integer pageNo = 0;
	private Integer pageSize = 10;

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

}
