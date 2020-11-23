package com.gavin.enumJava;

public enum Gender2 {
	MALE,FEMALE;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		switch (this) {
		case MALE:
			if(name.equals("男")){
				this.name = name;
			}else{
				System.out.println("参数错误..");
			}
		break;
		case FEMALE:
			if(name.equals("女")){
				this.name = name;
			}else{
				System.out.println("参数错误..");
			}
		break;
		default:
			break;
		}
	}
	
}
