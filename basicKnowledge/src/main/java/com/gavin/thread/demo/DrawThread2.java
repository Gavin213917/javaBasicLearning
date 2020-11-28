package com.gavin.thread.demo;

public class DrawThread2 extends Thread{

	//取钱账户
	private Account account;
	//取多少钱
	private double money;
	
	public DrawThread2(String name,Account account,double money){
		super(name);//getName()获取 如果是Runnable是没有getName方法，Thread.currentThread.getName();
		this.account = account;
		this.money = money;
	}
	
	public void run(){
		//同步执行的对象
		synchronized (account) {//加锁--执行--释放锁
			//账户余额如果大于取钱的数目，
			// A:吐钞  B:余额要减少
			if(account.getBalance() >= money){
				System.out.println(this.getName()+"取钱成功，吐钞是:"+money);
				try {
					Thread.sleep(10);//10毫秒
				} catch (Exception e) {
					e.printStackTrace();
				}
				account.setBalance(account.getBalance()-money);
				System.out.println("余额为："+account.getBalance());
			}else{
				//否则，提余额不足
				System.out.println("你好,"+getName()+"!取钱失败！余额不足....");
			}
		}
	}
}
