package com.gavin.designModel.factory.abstractFactory;

public class BuickFactory implements CarFactory{

	@Override
	public ICar createCar() {
		return new Buick();
	}

}
