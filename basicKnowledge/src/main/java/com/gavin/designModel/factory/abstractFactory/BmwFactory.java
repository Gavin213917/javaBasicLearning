package com.gavin.designModel.factory.abstractFactory;

public class BmwFactory implements CarFactory{

	@Override
	public ICar createCar() {
		return new Bmw();
	}

}
