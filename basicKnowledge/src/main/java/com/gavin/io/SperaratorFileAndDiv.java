package com.gavin.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.RandomAccessFile;

/**
 * F://a.rar 100MB
 * 
 * a-part01.rar 10mb
 * a-part02.rar 10mb
 * a-part03.rar 10mb
 * a-part04.rar 10mb
 * a-part05.rar 10mb
 * a-part06.rar 101mb
 * 
 * 
 * 合并
 * a-part01.rar 10mb
 * a-part02.rar 10mb
 * a-part03.rar 10mb
 * a-part04.rar 10mb
 * a-part05.rar 10mb
 * a-part06.rar 10mb
 * 
 * a.rar
 * 
 * 
 * 
 * 
 * @author arry
 *
 */
public class SperaratorFileAndDiv {

	private String fileName;//原始文件名
	long fileSize = 0;//源文件大小
	long blockNum = 0;//可分的块数
	
	/**
	 * 初始化文件的名称，或者文件的长度
	 * @param filePath
	 */
	private void getFileAttribute(String filePath){
		File file = new File(filePath);
		fileName = file.getName();
		fileSize = file.length();
	}

	
	/**
	 * 根据大小进行分割
	 * @param size
	 * @return
	 */
	private long getBlockNum(long size) {
		long fileSize = this.fileSize;
		if(fileSize <= size){
			return 1;
		}else{
			if(fileSize % size > 0){
				return fileSize / size + 1;
			}else{
				return fileSize /size;
			}
		}
	}
	
	/**
	 * 拆分的子文件，重命名
	 * @param filePath
	 * @param currentBlock
	 * @return
	 */
	private String generateSperatorName(String filePath,int currentBlock){
		String rname = filePath+".part"+currentBlock;
		System.out.println("文件拆分成："+rname);
		return rname;
	}
	
	
	
	private boolean writerFile(String sourcePath,String speratorPath,long blockSize,long beginPos){
		//定义任意访问流
		RandomAccessFile randomAccessFile = null;
		FileOutputStream out = null;
		byte[] bt = new byte[1024];
		long writeByte = 0;
		int len = 0;
		try {
			//创建任意访问对象，以只读的方式
			randomAccessFile = new RandomAccessFile(sourcePath, "r");
			randomAccessFile.seek(beginPos);//设置对象开始读取的位置
			//输出到分割的子文件中
			out = new FileOutputStream(speratorPath);
			while((len=randomAccessFile.read(bt))!=-1){
				if(writeByte < blockSize){
					writeByte = writeByte+len;
					if(writeByte <=blockSize){
						out.write(bt, 0, len);
					}else{
						len = len-(int)(writeByte-blockSize);
						out.write(bt, 0, len);
					}
				}
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally{
			try {
				if(out!=null)out.close();
				if(randomAccessFile!=null)randomAccessFile.close();
			} catch (Exception e2) {
			}
		}
	}
	
	
	
	
	/*文件分割方法*/
	private boolean seperatorFile(String sourcePath,long blockSize){
		//初始化文件的属性，获取文件名，获取文件大小
		getFileAttribute(sourcePath);
		//传递进来的大小，计算出，可以分割多少个子文件
		blockNum = getBlockNum(blockSize);
		System.out.println("共拆分为："+blockNum+"个子文件!");
		if(blockNum==1){
			blockSize = fileSize;
		}
		
		long writeSize = 0;//每次写入的字节
		long writeTotal = 0;//每次写了多少字节
		String currentNameAndPath = null;
		for(int i=1;i<=blockNum;i++){
			if(i<blockNum){
				writeSize = blockSize;
			}else{
				writeSize = fileSize - writeTotal;
			}
			
			if(blockNum==1){
				currentNameAndPath =sourcePath+".bat";
			}else{
				currentNameAndPath = generateSperatorName(sourcePath, i);
			}
			
			if(!writerFile(sourcePath, currentNameAndPath, writeSize, writeTotal)){
				return false;
			}
			writeTotal = writeTotal + writeSize;
		}
		
		return true;
	}
	
	
	//合并文件
	public static String unite(String[] fileNames,String targetFile){
		File inFile = null;
		//写入的目标文件
		File outFile = new File(targetFile);
		//输出流
		FileOutputStream out = null;
		byte[] b = new byte[1024*1024];
		try {
			//初始化输出流对象
			out = new FileOutputStream(targetFile);
			for (int i = 0; i < fileNames.length; i++) {
				inFile = new File(fileNames[i]);
				FileInputStream in = new FileInputStream(inFile);
				int c = 0;
				while((c=in.read(b))!=-1){
					out.write(b,0,c);
				}
			}
			return outFile.getAbsolutePath();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally{
			try {
				if(out!=null)out.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
	}
	
	private String[] getPartFileNames(String sourcePath,long blockSize){
		//初始化文件的属性，获取文件名，获取文件大小
		getFileAttribute(sourcePath);
		//传递进来的大小，计算出，可以分割多少个子文件
		blockNum = getBlockNum(blockSize);
		System.out.println("共拆分为："+blockNum+"个子文件!");
		if(blockNum==1){
			blockSize = fileSize;
		}
		String[] names = new String[(int)blockNum];
		String cname = null;
		for (int i = 1; i <=blockNum; i++) {
			if(blockNum==1){
				cname = sourcePath+".bat";
			}else{
				cname = generateSperatorName(sourcePath, i);
			}
			names[i-1] = cname;
		}
		return names;
	}
	
	
	public static void main(String[] args) {
		SperaratorFileAndDiv sperarator = new SperaratorFileAndDiv();
		String sourcePath = "c://test/test.rar";
		long blockSize = 1024*100;
//		boolean flag = sperarator.seperatorFile(sourcePath, blockSize);
//		if(flag){
//			System.out.println("文件拆分成功...");
//		}
		
		String[] names = sperarator.getPartFileNames(sourcePath, blockSize);
		String flag = sperarator.unite(names,"c://test/kekeunion.rar");
		System.out.println("合并文件的最后的路径是："+flag);
		
		
	}
}
