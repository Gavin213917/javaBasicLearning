package com.gavin.thread.money;

public class Account {

	// 账户和余额
	private String account;
	private double balance;
	
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
}
