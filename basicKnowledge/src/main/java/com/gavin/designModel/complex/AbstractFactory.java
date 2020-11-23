package com.gavin.designModel.complex;

public interface AbstractFactory {

	/**
	 * CPU 的选择
	 * @Title: createCpu 
	 * @author: Gavin
	 * @time: 2019年6月24日 上午9:13:40
	 * @param pins
	 * @return 
	 * @return: ICpu 
	 * @throws
	 */
	public ICpu createCpu(int pins);
	
	/**
	 * 主板的选择
	 * @Title: createMainBoard 
	 * @author: Gavin
	 * @time: 2019年6月24日 上午9:12:46
	 * @param mainpins
	 * @return 
	 * @return: IMainBoard 
	 * @throws
	 */
	public IMainBoard createMainBoard(int mainpins);
}
