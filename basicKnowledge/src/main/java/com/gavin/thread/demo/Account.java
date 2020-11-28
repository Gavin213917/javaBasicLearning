package com.gavin.thread.demo;

public class Account {

	private String account;// 账户
	private double balance;// 余额

	public Account() {
		super();
	}

	public Account(String account, double balance) {
		super();
		this.account = account;
		this.balance = balance;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}
	
	public static void main(String[] args) {
		new Account();
	}
	
	public synchronized void draw(String name,double money){
		//账户余额如果大于取钱的目录，
		// A:吐钞  B:余额要减少
		if(this.getBalance() >= money){
			System.out.println(name+"取钱成功，吐钞是:"+money);
			try {
				Thread.sleep(10);//10毫秒
			} catch (Exception e) {
				e.printStackTrace();
			}
			this.setBalance(this.getBalance()-money);
			System.out.println("余额为："+this.getBalance());
		}else{
			//否则，提余额不足
			System.out.println("你好,"+name+"!取钱失败！余额不足....");
		}
	}

}
