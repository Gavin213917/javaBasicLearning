package com.gavin.designModel.factory.abstractFactory;

public interface CarFactory {
	
	/**
	  * 造车工厂接口
	 * @Title: makeCar 
	 * @author: Gavin
	 * @time: 2019年6月21日 下午5:03:52
	 * @param mark
	 * @return 
	 * @return: ICar 
	 * @throws
	 */
	public ICar createCar();

}
