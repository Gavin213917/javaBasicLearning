package com.gavin.io.NIO.demo;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

/**
 * 为什么要有SerialVersionUID?
 * 为什么要有SerialVersionUID？应该说为什么要手动声明一个ServialVersionUID。因为只要你做了序列化了，
 * JAVA就会自动给你加上一个SerialVersionUID。
 * Java强烈建议我们显式的声明一个SerialVersionUID，因为SerialVersionUID默认值的计算是根据类的各个方面得来的（属性，方法。)
 * 详情：http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html。
 * 
 * 为什么要显式的声明一个SerialVersionUID，因为当你的修改了你的类（属性和方法），那么你当前类的默认SerialVersionUID（
 * local class serialVersionUID）就会改变，和你以前序列化到本地的SerialVersionUID（ stream
 * classdesc serialVersionUID
 * ）不同，那么你这时候反序列就会出错！抛出异常java.io.InvalidClassException！
 *
 */
class SerialVersionUIDTest {
	public static void main(String[] args) throws Exception {
//		Person person = new Person();
//		person.setUsername("hackingwu");
//		ObjectOutputStream oo = new ObjectOutputStream(new FileOutputStream("test"));
//		oo.writeObject(person);
//		oo.close();
		ObjectInputStream oi = new ObjectInputStream(new FileInputStream("test"));
		Person person_back = (Person) oi.readObject();
		System.out.println("HI,My name is " + person_back.getUsername());
		oi.close();
	}
}