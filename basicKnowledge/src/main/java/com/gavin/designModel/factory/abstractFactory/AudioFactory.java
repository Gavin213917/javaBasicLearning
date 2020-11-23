package com.gavin.designModel.factory.abstractFactory;

public class AudioFactory implements CarFactory{

	@Override
	public ICar createCar() {
		return new Audio();
	}

}
