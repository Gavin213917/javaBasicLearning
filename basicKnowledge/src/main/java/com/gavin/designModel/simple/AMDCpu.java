package com.gavin.designModel.simple;

/**
 * 
 * AMDCpu的CPU
 * AMDCpu<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月23日-下午11:51:21 <br/>
 * @version 1.0.0<br/>
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
