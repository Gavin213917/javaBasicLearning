package com.gavin.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Retention(value=RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequestMapping {

	//八种基础数据类型 和 string 数组 和枚举
	String[] value() default "";
	String name() default "";
	String type() default "all";
	RequestMethod method() default RequestMethod.ALL;
}
