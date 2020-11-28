package com.gavin.thread.demo;

public class TestMoney {

	
	public static void main(String[] args) {
		//开一个 户 存1000元
		Account account = new Account("中国银行",1000);
		
		//取钱--钱够-吐钞，如果不够，---余额不足
		Thread keke = new DrawThread("柯柯", account, 400);
		keke.start();
		
		Thread xiaochen = new DrawThread("小晨", account, 400);
		xiaochen.start();
		
		Thread xiaobin = new DrawThread("小斌", account, 400);
		xiaobin.start();
		
		
	}
}
