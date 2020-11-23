package com.gavin.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ObjectCreateDemo {

	
	public static void main(String[] args) throws IOException {
		
		/**
		 * java创建对象的方式有五种：
		 * 1:new 
		 * 2:反射
		 * 3:io流 实现 java.io.Serializable(序列化)--网络编程的时候--java.io.Externalizable
		 * 可以将对象以文本文件的存在磁盘中方式进行读和写
		 * 4:clone() 实现CloneAble的接口
		 * 
		 * 5:Object扩展
		 * 
		 */
		
		
		
//		User user = new User();
//		User user = (User) Class.forName("com.tz.op33.User").newInstance();
//		User user2 = user.clone(); //浅拷贝 深拷贝
		
		
		//rmi服务--ip 
		File file = File.createTempFile("temp", null);//创建临时文件
		file.deleteOnExit();//JVM退出的时候这个临时文件自动删掉
		
		
		try (//jdk1.7--rmi基于本地服务调用的跨服务的机制
			FileOutputStream fos = new FileOutputStream(file);
			ObjectOutputStream oos = new ObjectOutputStream(fos);
		){
			User user = new User();
			user.setId(1);
			user.setUsername("keke是的水电费");
			user.setBank(49434684);
			oos.writeObject(user);//讲对象写入到object.txt文件中
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		try (//jdk1.7--rmi基于本地服务调用的跨服务的机制
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
			){
				User user = (User) ois.readObject();
				System.out.println(user.getId());
				System.out.println(user.getUsername());
				System.out.println(user.getBank());
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		
	}
}
