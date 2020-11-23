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
public class MainBoardFactory {

	public static IMainBoard createMainBoard(int type){
		IMainBoard mainBoard = null;
		if(type==1){
			mainBoard = new IntelMainBoard(755);
		}else if(type==2){
			mainBoard = new AmdMainBoard(938);
		}
		return mainBoard;
	}
	
}
