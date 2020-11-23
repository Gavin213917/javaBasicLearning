package com.gavin.interfaceAndAbstract.abstractJava;

public class SonA extends Father{
	public String password;
	protected double money;

	@Override
	public void buyCigarette() {
		System.out.println("SonA走路去买烟...");
	}


}
