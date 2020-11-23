package com.gavin.exception.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.io.FileUtils;

/**
 * 
 * 在程序框架中，异常捕获 struts2
 * TzServiceException<br/>
 * 创建人:xuchengfei<br/>
 * 时间：2016年5月19日-下午9:37:55 <br/>
 * @version 1.0.0<br/>
 *
 */
public class TzDaoException extends Exception{

    public TzDaoException() {
        super();
    }

    public TzDaoException(String message) {
        super("TzServiceException==>"+message);
    }
    
    
    public void writerFile(String message){
    	try {
    		String ymd = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
			FileUtils.write(new File("d://log-"+ymd+".txt"),message, "utf-8", true);
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
    
    public void writerFile(String message,Class clz,String method){
    	try {
    		String ymd = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
			FileUtils.write(new File("d://log-"+ymd+".txt"),clz.getName()+"===【"+method+"】异常信息是："+message, "utf-8", true);
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

    public TzDaoException(String message, Throwable cause) {
        super(message, cause);
    }

    public TzDaoException(Throwable cause) {
        super(cause);
    }
}
