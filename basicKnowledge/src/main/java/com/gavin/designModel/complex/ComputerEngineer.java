package com.gavin.designModel.complex;

/**
 * 
 * 电脑组装了
 * ComputerEngineer<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月24日-上午12:02:20 <br/>
 * @version 1.0.0<br/>
 *
 */
public class ComputerEngineer {

	/**
	 * 组装电脑
	 * 方法名：makeComputer<br/>
	 * 创建人：xuchengfei <br/>
	 * 时间：2016年4月24日-上午12:19:32 <br/>
	 * 手机:1564545646464<br/>
	 * @param abstractFactory
	 * @param pins
	 * @param mainboardpins void<br/>
	 * @exception <br/>
	 * @since  1.0.0<br/>
	 */
	public void makeComputer(AbstractFactory abstractFactory,int pins,int mainboardpins){
		//cpu
		ICpu cpu =  abstractFactory.createCpu(pins);
		IMainBoard mainBoard = abstractFactory.createMainBoard(mainboardpins);
		//测试
		cpu.calculate();
		mainBoard.installCpu();
	}
}
