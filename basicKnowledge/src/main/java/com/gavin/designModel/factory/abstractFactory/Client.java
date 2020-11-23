package com.gavin.designModel.factory.abstractFactory;

public class Client {

	public static void main(String[] args) {
		//普通工厂
//		ICar car = CarFactory.createCar("bmw");
//		car.makeCar();
		
		
		//抽象工厂
		CarFactory carFactory = new BmwFactory();
		ICar car = carFactory.createCar();
		car.makeCar();
	}

}
