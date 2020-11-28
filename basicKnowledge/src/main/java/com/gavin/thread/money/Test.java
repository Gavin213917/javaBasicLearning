package com.gavin.thread.money;

public class Test {

	public static void main(String[] args) {
		//创建一个账户
		Account account = new Account("keke",1000);
		DrawThread thread1 = new DrawThread("小贾", account, 800);
		thread1.start();
		DrawThread thread2 = new DrawThread("小张", account, 800);
		thread2.start();
		
	}
}
