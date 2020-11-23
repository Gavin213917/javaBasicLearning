package com.gavin.designModel.factory.base;

public class Client {

	public static void main(String[] args) {
		ICar car = CarFactory.createCar("bmw");
		car.makeCar();
		
	}

}
