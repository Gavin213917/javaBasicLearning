package com.gavin.reflect;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.Type;

import com.gavin.string.StringUtils;



public class ReflectUtil {
	
	
	
	
	public static void main(String[] args) throws CloneNotSupportedException  {
		
		/**
		 * Class--每个类加载之后都是生成一个对象的Class对象，通过该Class对象可以访问jvm虚拟机的这个类信息,构造函数，属性，方法，参数，注解。
		 * 类获取class对象的三种方式：
		 * 1:使用Class.forName(包名+类名)
		 * 2:某个类的.class属性来获取Class对象
		 * 3:调用某个对象的getClass() 方法获取Class对象
		 * 
		 * 反射就是可以通过程序动态的去修改jvm虚拟机已经被加载好的方法区区域里面的属性，成员变量。赋值，调用方，传递参数.
		*/
		
		
		/**
		 * 1:只有对象才能够调用方法和给成员属性赋值的能力
		 * 2:反射基础一定还是要创建对象--值注入，对象的转换（bean-map）(map-bean)(bean-xml)(xml-bean)(bean-json/map)(json-bean/map)
		 * 创建对象：
		 * 1:new
		 * 2:反射--spring ioc /struts2/mybatis等都是用反射去创建对象
		 * 3:ObjectInputStream 序列化和反序列  implements Serializable--Hibernate
		 * 4:clone implements Cloneable
		 * 5:Object创建对象
		 * 
		 * user/list
		 * 
		 * UserAction
		 * <action name="user/list" method="list" class="com.tz.action.UserAction">
		 * 
		 * Class clz = Class.forName("com.tz.action.UserAction");
		 * Object obj = clz.newInstance();
		 * method.invoke(obj,"list",参数);
		 * public String list(){
		 * 
		 * }
		 * 
		 * 如果不理解反射，就把当做一种对象调用方法给成员变量赋值的方式
		 * 
		 */
		
		
		//通过new对象赋值的方式
//		User user = new User();
//		user.id = 1;
//		user.username = "keke";
//		user.money = 12.5f;
//		
//		
//		user.setNum(10L);
//		String[] teachers = {"keke","xiaoer"};
//		user.setTeachers(teachers);
		
		
		//反射
		try {
//			Class clz2 = User.class;
//			Class clz3 = user.getClass();
			Class clz = Class.forName("com.gavin.bean.User`");
			//对象的创建
			User  user= (User)clz.newInstance();
			
			//解析属性
			//解析单个
//			Field field2 = clz.getDeclaredField("id");
//			System.out.println("属性名称:"+field2.getName());
//			System.out.println("属性的修饰符:"+field2.getModifiers());//修饰符
//			System.out.println("属性的数据类型:"+field2.getType());//数据类型
////			System.out.println(field2.getGenericType());
//			System.out.println("属性的值:"+field2.get(user));//从那个对象中获取值
			
			
			//0缺省的
			//1:公开的
			//2:私有的
			//4:受保护
			//细粒度控制到列的权限----不用bean---sql+map 就可以了--OA
			
			System.out.println(Modifier.PUBLIC);//1
			System.out.println(Modifier.PRIVATE);//2
			System.out.println(Modifier.PROTECTED);//4
			System.out.println(Modifier.STATIC);//8
			System.out.println(Modifier.FINAL);//16
			System.out.println(Modifier.SYNCHRONIZED);//32
			System.out.println(Modifier.VOLATILE);//64
			System.out.println(Modifier.NATIVE);//256
			
			System.out.println("*****************************************");
			System.out.println("*****************************************");
			Field[] field= clz.getDeclaredFields();
			for (Field field3 : field) {
				field3.setAccessible(true);//访问私有成员
				System.out.println("属性名称:"+field3.getName());
				System.out.println("属性的修饰符:"+field3.getModifiers());//修饰符
				System.out.println("属性的数据类型:"+field3.getType());//数据类型
//				Type type = field3.getGenericType();
//				System.out.println(type.getTypeName());
				System.out.println("属性的值:"+field3.get(user));//从那个对象中获取值
				System.out.println("===================");
			}
			System.out.println("*****************************************");
			System.out.println("*****************************************");
			
			
			String fileName = "id";
			Field field3 = clz.getDeclaredField(fileName);
			String methodName = StringUtils.toUpperCaseFirst(fileName);
			
			
			//解析方法
//			user.setId(100);
			Method setMethod = clz.getDeclaredMethod("set"+methodName,field3.getType());
			setMethod.invoke(user,100);
			
			
//			Integer id = user.getId();
			Method getMethod = clz.getDeclaredMethod("get"+methodName);
			Object obj= getMethod.invoke(user);
			System.out.println(obj);
			
			
//			Method[] methods = clz.getDeclaredMethods();
//			for (Method method : methods) {
//				System.out.println(method.getName());
//				System.out.println(method.getModifiers());
//				System.out.println(method.getDefaultValue());
//				System.out.println(method.getParameterCount());
//			}
			
			
			//解析参数
			
			
			//解析注解
			
			
			
			//解析构造函数
			
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		
		
	}
	
}
