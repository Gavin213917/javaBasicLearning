package com.gavin.exception;

public class RuntimeExceptionDemo {

	
	public static void main(String[] args) {
		int count = saveUser();
		System.out.println(count==1?"success":"fail");
		
		try {
			Class.forName("com.tz.user.testse");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.out.println("找不到类...."+e.getMessage());
		}
		
	}
	

	public static int saveUser(){
		//runtime异常如果不进行try/catch去捕获的话，是允许的，jvm就是调用默认的处理异常机制，进行异常的处理
		try {
//			User user1 = null;//初始化，这一行不会报错
//			System.out.println(user1.getUsername());//这一行会报错，空指针异常
			
			User user = new User();//初始化
			user.setUsername("keke");
			System.out.println(user.getUsername());
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("有空指针....");
			return 0;
		}
		
	}
}
