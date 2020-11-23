package com.gavin.designModel.simple;

public class AmdMainBoard implements IMainBoard{

	/*CPU插槽的孔数*/
	private int cpuHoles;
	
	
	public AmdMainBoard(int cpuHoles){
		this.cpuHoles = cpuHoles;
	}
	
	
	@Override
	public void installCpu() {
		System.out.println("AmdMainBoard 的主板的CPU的插槽的孔数是:"+this.cpuHoles);
	}

}
