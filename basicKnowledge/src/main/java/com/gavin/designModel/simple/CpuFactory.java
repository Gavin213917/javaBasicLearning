package com.gavin.designModel.simple;

/**
 * 
 * 利用简单工程来组装
 * CpuFactory<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年4月23日-下午11:59:41 <br/>
 * @version 1.0.0<br/>
 *
 */
public class CpuFactory {

	public static ICpu createCpu(int type){
		ICpu cpu = null;
		if(type==1){
			cpu = new IntelCpu(755);
		}else if(type==2){
			cpu = new AMDCpu(938);
		}
		return cpu;
	}
	
}
