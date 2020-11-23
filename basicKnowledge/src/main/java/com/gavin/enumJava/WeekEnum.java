package com.gavin.enumJava;

public enum WeekEnum  {
	
	//当做构造函数
	Monday("星期一"), // 星期一
	Tuesday("星期二"), // 星期二
	Wednesday("星期三"), // 星期三
	Thursday("星期四"), // 星期四
	Friday("星期五"), // 星期五
	Saturday("星期六"), // 星期六
	Sunday("星期日");// 星期日
	
	private WeekEnum(String name){
		this.name = name;
	}
	
	//成员变量
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name= name;
	}


	public void test(){
		System.out.println("ok");
	}
}
