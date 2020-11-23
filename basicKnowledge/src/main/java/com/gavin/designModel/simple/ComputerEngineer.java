package com.gavin.designModel.simple;

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

	
	//cpu
	private ICpu cpu=null;
	//主板
	private IMainBoard mainBoard = null;
	
	
	public ComputerEngineer(int cpuType,int mainboardType){
		this.preparedHardWares(cpuType, mainboardType);
	}
	
	public void preparedHardWares(int cpuType,int mainboardType){
		//cpu
		this.cpu = CpuFactory.createCpu(cpuType);
		this.mainBoard = MainBoardFactory.createMainBoard(mainboardType);
		
		//测试
		this.cpu.calculate();
		this.mainBoard.installCpu();
	}
}
