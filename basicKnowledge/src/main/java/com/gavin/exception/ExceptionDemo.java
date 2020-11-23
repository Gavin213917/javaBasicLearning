package com.gavin.exception;

import java.io.FileOutputStream;

public class ExceptionDemo {
	
	/**异常是针对业务逻辑--方法体
	 * 
	 * Checked Exception--在编译阶段jvm就已经确定一定捕获的异常--IOException,SQLException
	 * 可以预见病症
	 * 
	 * 
	 * unchecked Exception(RuntimeException) --NullPointerException
	 * 可能会有，可能也没有(可以捕获，)---如果报错，会启动jvm中自动异常处理机制
	 * 
	 * 异常:让程序开发者，更加方便查找问题出现的病症，让程序代码变得更加健壮，以及
	 * 让程序代码更加容易控制我错误的信息和数据的流向。 
	 * 
	 * Error:一般是指jvm相关的错误，比如系统崩溃，虚拟机出错，栈溢出，动态链接失败等这种错误不是程序可控，这种错误也无法恢复和不可能去捕获的错误，因此程序代码不能通过
	 * try/catch进行捕获。
	 * */
	
	public static String test(){
		try {
			User  user = new User();
			user.setUsername("keke");
			System.out.println(user.getUsername());
			return "success";
		} catch (NullPointerException e) {
			e.printStackTrace();
			return "null";
		}
	}
	
	public static void main(String[] args) {
		
		String result = test();
		if(result=="null"){
			System.out.println("你当前输入的用户名为null");
		}
		
		
//		User user = null;
//		PrintStream printStream=null;
//		try {
//			printStream = new PrintStream("d://a.txt");
//			System.out.println(user.getUsername());
//		}catch(NullPointerException e){
//			System.out.println("ok");
//			e.printStackTrace(printStream);
//		}catch (Exception e) {
//			System.out.println("ok ok");
//		}
		
//		int r = getNum();
//		System.out.println(r);
//		
//		bid("2");
	}
	
	public static int getNum(){
		int a = 10;
		try {
			int b = 1/0;
			a++;
		} catch (Exception e) {
			a++;
			System.exit(1);
		} finally {
			System.out.println("会执行吗?");
			a++;
		}
		return a;
	}
	
	
	public static void bid(String price)  {
		double d = 0.0;
		try {
			d = Double.parseDouble(price);
		} catch (Exception e) {
			e.printStackTrace();
//			throw new AuthenticationException("请输入数字");
			throw e;
		}
	}
	
	public static void bid2(String price) throws Exception  {
		double d = 0.0;
		try {
			new FileOutputStream("a.txt");
		} catch (Exception e) {
			e.printStackTrace();
//			throw new AuthenticationException("请输入数字");
			throw e;
		}
	}
}
