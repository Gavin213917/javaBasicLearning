package com.gavin.io.NIO;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Paths;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;

import org.apache.commons.io.FileUtils;


//javaNio.2
public class WatchServiceTest {

	
	public static void main(String[] args) throws IOException, InterruptedException {
		
		//观察服务
		WatchService watchService = FileSystems.getDefault().newWatchService();
		String root = "d:/";
		Paths.get(root).register(watchService, StandardWatchEventKinds.ENTRY_CREATE,
				StandardWatchEventKinds.ENTRY_MODIFY,
				StandardWatchEventKinds.ENTRY_DELETE
			);
		
		
		while (true) {
			
			//获取下一个文件变化时间
			WatchKey key = watchService.take();
			for (WatchEvent<?> event : key.pollEvents()) {
				System.out.println(event.context()+"文件发生了"+event.kind()+"事件!");
				System.out.println(FileUtils.readFileToString(new File(root+event.context()),"utf-8"));
			}
			
			//重设watchkey
			boolean v = key.reset();
			if(!v){
				break;
			}
			
		}
	}
}
