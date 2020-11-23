package com.gavin.lambda.s3;

import javax.swing.JFrame;

import com.gavin.lambda.jdbc.User;


public class ConverterTest {

	public static void main(String[] args) {
		
//		Converter converter = from->{
//			return Integer.valueOf(from);
//		};
		
		Converter converter = from-> Integer.valueOf(from);
		int result = converter.convert("99");
		System.out.println(result);
		
		//如果Lambda表达式中只有一行调用类方法的代码，还可以使用如下方法引用进行替换:
		Converter converter2 = Integer::valueOf;
		
		
//		SubStringFK fk = (a,b,c)->a.substring(b, c);
		SubStringFK fk = String::substring;
		String result2 = fk.test("i love you ", 1,9);
		System.out.println(result2);
		
		
		UserFK userFK = (a,b) -> new User();
		User user = userFK.test("keke", "123456");
		System.out.println(user);
	}
}
