package com.gavin.enumJava;

public enum Gender3 implements GrenderDesc {
	
	MALE("男"){
		public void message() {
			System.out.println("我是一个男生哦");
		}
	},FEMALE("女"){
		public void message() {
			System.out.println("我是一个女生哦");
		}
	},OTHER("其他"){
		public void message() {
			System.out.println("我是一个其他哦");
		}
	};
	
	private Gender3(String name){
		this.name = name;
	}
	
	private String name;
	public String getName() {
		return name;
	}
	

	
}
