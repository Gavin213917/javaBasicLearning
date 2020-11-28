package com.gavin.thread.demo;

public class DrawThread extends Thread{

	//取钱账户
	private Account account;
	//取多少钱
	private double money;
	
	public DrawThread(String name,Account account,double money){
		super(name);//getName()获取 如果是Runnable是没有getName方法，Thread.currentThread.getName();
		this.account = account;
		this.money = money;
	}
	
	public void run(){
		account.draw(getName(), money);
	}
}
