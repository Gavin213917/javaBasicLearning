package com.gavin.designModel.complex;

/**
 * AMDCpu的CPU
 * @author 18158
 *
 */
public class AMDCpu implements ICpu {

	/**
	 * cpu的针脚数
	 */
	private int pins=0;
	
	public AMDCpu(int pins){
		this.pins = pins;
	}
	
	@Override
	public void calculate() {
		System.out.println("AMDCpu  的针脚数是:"+this.pins);
	}
}
