package com.gavin.thread;

public class ThirdThread implements Runnable{

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
				ThirdThread thread = new ThirdThread();
				Thread t1 = new Thread(thread);
				t1.start();
				//main线程调用t1线程的join方法，main线程，必须等t1执行结束才会向下执行。
				t1.join();
			}
			System.out.println(Thread.currentThread().getName()+"====>"+i);
		}
	}
}
