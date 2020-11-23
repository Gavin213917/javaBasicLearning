package com.gavin.designModel.complex;


public class AMDFactory implements AbstractFactory {

	@Override
	public ICpu createCpu(int pins) {
		return new AMDCpu(pins);
	}

	@Override
	public IMainBoard createMainBoard(int mainpins) {
		return new AmdMainBoard(mainpins);
	}
}
