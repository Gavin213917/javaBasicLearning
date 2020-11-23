package com.gavin.designModel.complex;

/**
 * Intel的CPU
 * @author 18158
 *
 */
public class IntelCpu implements ICpu {

	/**
	 * cpu的针脚数
	 */
	private int pins=0;
	
	public IntelCpu(int pins){
		this.pins = pins;
	}
	
	@Override
	public void calculate() {
		System.out.println("Intel Cpu 的针脚数是:"+this.pins);
	}
}
