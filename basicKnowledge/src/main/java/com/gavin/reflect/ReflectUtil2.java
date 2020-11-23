package com.gavin.reflect;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

public class ReflectUtil2 {
	
	/**
	 * 根据对象获取到对应属性值
	 * 方法名：getPropertyValue<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月28日-下午11:30:40 <br/>
	 * 手机:1564545646464<br/>
	 * @param obj
	 * @param fieldName
	 * @return Object<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static <T> T getPropertyValue(Object obj,String fieldName){
		try {
			Class clz = obj.getClass();
			Field field = clz.getDeclaredField(fieldName);
			field.setAccessible(true);
			return (T)field.get(obj);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * 实例化对象---调用无参构造函数
	 * 方法名：getObject<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月30日-下午9:26:23 <br/>
	 * 手机:1564545646464<br/>
	 * @param clz
	 * @return Object<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static Object getObject(Class clz){
		try {
			Constructor constructor = clz.getDeclaredConstructor();
			return constructor.newInstance();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 
	 * 方法名：getObject<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月30日-下午9:27:43 <br/>
	 * 手机:1564545646464<br/>
	 * @param clz
	 * @param params
	 * @return Object<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static Object getObject(Class clz,Object...params){
		try {
			Class[] types = new Class[params.length];
			for (int i = 0; i < params.length; i++) {
				types[i] = params[i].getClass();
			}
			Constructor constructor = clz.getDeclaredConstructor(types);
			return constructor.newInstance(params);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 泛型构造函数
	 * 方法名：getObject2<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月30日-下午9:37:17 <br/>
	 * 手机:1564545646464<br/>
	 * @param clz
	 * @param params
	 * @return T<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public static <T> T getObject2(Class clz,Object...params){
		try {
			Class[] types = new Class[params.length];
			for (int i = 0; i < params.length; i++) {
				types[i] = params[i].getClass();
			}
			Constructor constructor = clz.getDeclaredConstructor(types);
			return (T)constructor.newInstance(params);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		String[] names = {"keke","xiaobai"};
		User user= ReflectUtil2.getObject2(User.class, 1,"keke",12.5f,names,5l);
		System.out.println(user.getId());
		System.out.println(user.getUsername());
		System.out.println(user.getMoney());
	}
}
