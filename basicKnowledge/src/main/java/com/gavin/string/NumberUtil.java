package com.gavin.string;

import java.math.BigDecimal;

public class NumberUtil {

	
	public static final int DIVRADIX = 10;	
	
	/**
	 * 两个数字相加的方法
	 * @Title:plus
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:20:14 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static double plus(double a,double c){
		BigDecimal ba = new BigDecimal(a);
		BigDecimal bc = new BigDecimal(c);
		return ba.add(bc).doubleValue();
	}
	
	/**
	 * 两个数字相减的方法
	 * @Title:minus
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:20:43 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static double minus(double a,double c){
		BigDecimal ba = new BigDecimal(a);
		BigDecimal bc = new BigDecimal(c);
		return ba.subtract(bc).doubleValue();
	}
	
	/**
	 * 两个数字相乘的方法
	 * @Title:multiply
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:21:04 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static double multiply(double a,double c){
		BigDecimal ba = new BigDecimal(a);
		BigDecimal bc = new BigDecimal(c);
		return ba.multiply(bc).doubleValue();
	}
	
	
	/**
	 * 两个数字相除的方法
	 * @Title:div
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:21:38 
	 * @Description: int r 代表保留多少位  
	 * @version 1.0
	 */
	public static double div(double a,double c,int r){
		BigDecimal ba = new BigDecimal(a);
		BigDecimal bc = new BigDecimal(c);
		return ba.divide(bc,r,BigDecimal.ROUND_HALF_EVEN).doubleValue();
	}
	
	/**
	 * 两个数字相除的方法
	 * @Title:div
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:21:53 
	 * @Description:   
	 * @version 1.0
	 */
	public static double div(double a,double c){
		BigDecimal ba = new BigDecimal(a);
		BigDecimal bc = new BigDecimal(c);
		return ba.divide(bc,DIVRADIX,BigDecimal.ROUND_HALF_EVEN).doubleValue();
	}
	
	
	/**
	 * 测试方法
	 * @Title:main
	 * @author:Gavin  
	 * @date: 2019年5月14日下午1:18:54 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static void main(String[] args) {
		//加法
		System.out.println(plus(1, 3));
		//减法
		System.out.println(minus(1, 3));
		//乘法
		System.out.println(multiply(1, 3));
		//除法
		System.out.println(div(1, 3));
		//保留16位
		System.out.println(div(1, 3,16));
	}

}
