package com.gavin.designModel.simple;

/**
 * 
 * Intel的CPU
 * IntelCpu<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月23日-下午11:51:21 <br/>
 * @version 1.0.0<br/>
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
