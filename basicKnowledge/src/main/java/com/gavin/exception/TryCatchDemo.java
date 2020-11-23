package com.gavin.exception;

public class TryCatchDemo {

	public static void main(String[] args) {
		/*Exception --try/catch进行捕获提示错误,在未来程序开发中，除了checked exception需要强制try/catch，其他的(runtimeException)可以不用try/catch
		 * 但是如果你的程序代码发现执行并不是你想要的结果，又没有报错的情况下，记住一定用try/catch包裹起来；看看到底有没有错误。
		 * 
		 * */
		
		/*
		 * 异常的定义方式:	
		 * 1:tc
		 * 2:tc....
		 * 3:tc..f/tf
		 * 
		 * 1：如果在程序代码，如果遇到异常信息以后，jvm直接退出，后面代码全部忽略，方法执行终止，也不会返回值直说了。(也就不会return)。
		 * 2:异常规则：先小异常，后大异常  (平级异常顺序无关)
		 * */
		
		/*
		try {
			int a = 10;
			int b = a/5;
			String[] names = {"keke","xiaozhang"};
			names[2]="xiaoke";
			System.out.println("这里会执行吗？");
		}
		
		catch(IndexOutOfBoundsException e){
			System.out.println("IndexOutOfBoundsException 数组越界了....");
		}
		
		catch(ArithmeticException e){
			System.out.println("ArithmeticException 你程序代码中，0不能被整除!!");
		}
		
		catch (RuntimeException e) {
			System.out.println("RuntimeException 出错了...");
		}
		catch (Exception e) {
			System.out.println("Exception 出错了...");
		}
		*/
		
//		try {
//			int a = 10;
//			int b = a/0;
//			String[] names = {"keke","xiaozhang"};
//			names[2]="xiaoke";
//			System.out.println("这里会执行吗？");
//		} catch (Exception e) {
//			
//			
//		}
		
		
		
		
		

	
		
//		try {
//			
//		} catch (Exception e) {
//		}
//		
//		try {
//			
//		} finally {
//			// TODO: handle finally clause
//		}
//		
//		
//		try {
//			
//		}catch (RuntimeException e) {
//			// TODO: handle exception
//		}catch (Exception e) {
//			// TODO: handle exception
//		}
//		
//		
//		try {
//			
//		}catch (RuntimeException e) {
//			// TODO: handle exception
//		}catch (Exception e) {
//			// TODO: handle exception
//		} finally {
//			
//		}
		
		
		
//		try {
//			Class.forName("").newInstance();
//		} catch (ClassNotFoundException e) {
//			e.printStackTrace();
//		} catch (InstantiationException e) {
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			e.printStackTrace();
//		}
		
		
//		try {
//			FileInputStream inputStream = new FileInputStream("d://a.txt");
//			inputStream.read(null);
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		
//		try {
//			Statement statement = null;
//			ResultSet rSet = statement.executeQuery("");
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
		
		
		
		
	}
}
