package com.gavin.thread.money;

public class DrawThread extends Thread{

	//模拟账户
	private Account account;
	//模拟取出的金额
	private double drawMoney;
	
	public DrawThread(String name,Account account,double money){
		super(name);
		this.account = account;
		this.drawMoney = money;
	}
	
	//当多个线程同时共享一个数据是，将设计到数据安全的问题
	public void run(){
		synchronized (account) {
			//如果余额大于取钱数目
			if(account.getBalance() >=drawMoney){
				//吐钞成功
				System.out.println(getName()+"，取钱成功，钞票是："+drawMoney);
				try {
					Thread.sleep(10);
				} catch (Exception e) {
					e.printStackTrace();
				}
				account.setBalance(account.getBalance()-drawMoney);
				System.out.println("还剩下的余额是："+account.getBalance());
			}else{
				System.out.println(getName()+",取钱失败！余额不足!");
			}
		}
	}
	
}
