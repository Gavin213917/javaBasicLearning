package com.gavin.designModel.complex;

/**
 * 
 * 
 * AMDFactory<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月24日-上午12:15:44 <br/>
 * @version 1.0.0<br/>
 *
 */
public class IntelFactory implements AbstractFactory {

	@Override
	public ICpu createCpu(int pins) {
		return new IntelCpu(pins);
	}

	@Override
	public IMainBoard createMainBoard(int mainpins) {
		return new IntelMainBoard(mainpins);
	}
}
