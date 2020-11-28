package com.gavin.thread.demo;

public class Test {

	public static void main(String[] args) {
		
		//一个线程类继承Thread它是一个独立的线程
		
//		Thread thread1 = new MyThread();//keke 吃100--
//		thread1.start();
//		
//		
//		
//		
//		Thread thread2 = new MyThread();//xiaonian 吃100
//		thread2.start();
		
		//Thread 各准备100分，都要执行一百次
		
		//Runnable 各准备100分，都要执行一百次
		
		
		//线程类--任务 100 0 1 2 3 4 5 6 7 8 9  
		MyRunnable runnable = new MyRunnable();
		
		Thread thread1 = new Thread(runnable);
		Thread thread2 = new Thread(runnable);
		
		thread1.start();
		thread2.start();
		
		
		
	
	}
}
