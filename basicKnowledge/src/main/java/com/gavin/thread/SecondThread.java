package com.gavin.thread;

public class SecondThread implements Runnable{

	private int i;
	
	@Override
	public void run() {
		for (; i < 100; i++) {
			System.out.println(Thread.currentThread().getName()+" ====> "+i);
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		for (int i = 0; i < 100; i++) {
			if(i==20){
				//启动第一个线程
				SecondThread thread = new SecondThread();
				Thread t1 = new Thread(thread);
				t1.start();
				//启动第二线程
				Thread t2 = new Thread(thread);
				t2.start();
			}
			System.out.println(Thread.currentThread().getName()+"====>"+i);
		}
	}
}
