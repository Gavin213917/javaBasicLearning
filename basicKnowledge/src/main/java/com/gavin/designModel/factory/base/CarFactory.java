package com.gavin.designModel.factory.base;

public class CarFactory {
	
	/**
	  * 造车工厂
	 * @Title: makeCar 
	 * @author: Gavin
	 * @time: 2019年6月21日 下午5:03:52
	 * @param mark
	 * @return 
	 * @return: ICar 
	 * @throws
	 */
	public static ICar createCar(String mark) {
		if(mark.equalsIgnoreCase("audio")) {
			return new Audio();
		}else if(mark.equalsIgnoreCase("bmw")) {
			return new Bmw();
		}else if(mark.equalsIgnoreCase("buick")) {
			return new Buick();
		}
		return null;
	}

}
