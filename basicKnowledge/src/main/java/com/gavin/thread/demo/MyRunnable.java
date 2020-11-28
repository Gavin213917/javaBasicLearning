package com.gavin.thread.demo;

public class MyRunnable implements Runnable{

	private String url;
	private int i;
	public void run(){
		//要执行的任务--都一种任务--抓取网页（）存数据库
		for (; i < 100; i++) {
			System.out.println(Thread.currentThread().getName()+"=="+i);
		}
	}
}
