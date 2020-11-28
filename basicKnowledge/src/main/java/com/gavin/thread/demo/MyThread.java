package com.gavin.thread.demo;

public class MyThread extends Thread{

	private int i;
	public void run(){
		//要执行的任务--都一种任务--抓取网页（）存数据库
		for (; i < 100; i++) {
			System.out.println(getName()+"=="+i);
		}
		//抓取
		//线程和线程之间---谦谦君子、势利小人
		//存数据
		
		//线程同步--同步对象
	}
	
	
}
