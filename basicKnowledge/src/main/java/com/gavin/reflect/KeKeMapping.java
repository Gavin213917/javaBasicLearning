package com.gavin.reflect;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented/*如果通过javadoc工具*/
@Retention(value=RetentionPolicy.RUNTIME)
@Target({
	ElementType.FIELD,
	ElementType.METHOD,
	ElementType.CONSTRUCTOR,
	ElementType.PARAMETER,
	ElementType.TYPE/*类，接口，枚举类，抽象类*/
})
public @interface KeKeMapping {
	/*类，方法，构造函数，属性*/
	String value() default "";
	String desc() default "";
	String def() default "";
}
