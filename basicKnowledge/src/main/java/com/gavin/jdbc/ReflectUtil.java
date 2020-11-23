package com.gavin.jdbc;

import java.lang.reflect.Method;
import java.util.Date;

public class ReflectUtil {
   
	
	/**
	 * 设置对象的参数
	 * 方法名：setValue<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年6月2日-下午11:34:41 <br/>
	 * 手机:1564545646464<br/>
	 * @param name
	 * @param value
	 * @param obj void<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static void setValue(String name,Object value,Object obj){
		try {
			Class clz = obj.getClass();
			String tname = value.getClass().getTypeName();
			if(tname.equalsIgnoreCase("java.sql.Timestamp") || tname.equalsIgnoreCase("java.sql.Date")
					|| tname.equalsIgnoreCase("java.sql.time"))tname = "java.util.Date";
			Method method = clz.getDeclaredMethod("set"+name, Class.forName(tname));
			method.invoke(obj, value);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		User user = new User();
		ReflectUtil.setValue("Username", "keke", user);
		ReflectUtil.setValue("Age", 30, user);
		ReflectUtil.setValue("Birthday", new Date(), user);
		System.out.println(user.getUsername());
		System.out.println(user.getAge());
		System.out.println(user.getBirthday());
	}
 
}