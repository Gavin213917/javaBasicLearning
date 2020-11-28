package com.gavin.thread;

public class YieldTest extends Thread {

	private int i;
	
	@Override
	public void run() {
		for (; i < 100; i++) {
			
			System.out.println(getName()+" ====> "+i);
			if(i==20){
				Thread.yield();
			}
		}
	}
	
	public static void main(String[] args) {
		//启动第一个线程
		YieldTest t1 = new YieldTest();
		t1.setPriority(MAX_PRIORITY);
		t1.start();
		//启动第二线程
		YieldTest t2 = new YieldTest();
		t2.setPriority(MIN_PRIORITY);
		t2.start();
	}
}
