package com.gavin.utils;

import java.util.Enumeration;
import java.util.Properties;

public class FindJdkUrl {

	public static void main(String[] args) {
		Properties properties = System.getProperties();
		Enumeration<?> enumeration = properties.propertyNames();
		while(enumeration.hasMoreElements()){
			String val=String.valueOf(enumeration.nextElement());
			System.out.println(val+"============="+System.getProperty(val));
		}
	}

}
