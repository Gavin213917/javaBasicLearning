package com.gavin.reflect;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectUtilAnnotation {

	public static void main(String[] args) {
		
		try {
			Class clz = Class.forName("com.gavin.reflect.User");
			Object object = clz.newInstance();
			
			//获取类上的注解
			KeKeMapping annotation = (KeKeMapping) clz.getAnnotation(KeKeMapping.class);
			System.out.println(annotation.desc());
			
			System.out.println("***************构造函数注解获取***************");
			//构造函数
			Constructor[] constructors = clz.getDeclaredConstructors();
			for (Constructor constructor : constructors) {
				KeKeMapping can = (KeKeMapping) constructor.getAnnotation(KeKeMapping.class);
				if(can!=null){
					System.out.println(can.desc());
				}
			}
			
			System.out.println("***************方法注解获取***************");
			//方法
			Method[] methods = clz.getDeclaredMethods();
			for (Method method : methods) {
				KeKeMapping can = (KeKeMapping) method.getAnnotation(KeKeMapping.class);
				if(can!=null){
					System.out.println(can.desc()+"=="+can.def()+"=="+can.value());
				}
				
				
//				Parameter[] parameters = method.getParameters();
//				for (Parameter parameter : parameters) {
//					Annotation[] annotations = parameter.getAnnotations();
//					for (Annotation annotation2 : annotations) {
//						KeKeMapping canc = (KeKeMapping)annotation2;
//						if(canc!=null){
//							System.out.println(method.getName()+"==="+canc.value());
//						}
//					}
//				}
				
				Annotation[][] annotations = method.getParameterAnnotations();
				for (Annotation[] annotations2 : annotations) {
					for (Annotation annotation2 : annotations2) {
						KeKeMapping canc = (KeKeMapping)annotation2;
						if(canc!=null){
							System.out.println(method.getName()+"==="+canc.value());
						}
					}
				}
			}
			
			System.out.println("***************属性注解获取***************");
			//成员变量
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				KeKeMapping can = (KeKeMapping) field.getAnnotation(KeKeMapping.class);
				if(can!=null){
					System.out.println(can.desc()+"=="+can.def()+"=="+can.value());
				}
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}
	
}

