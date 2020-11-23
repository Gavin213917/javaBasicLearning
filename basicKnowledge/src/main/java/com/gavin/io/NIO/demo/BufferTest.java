package com.gavin.io.NIO.demo;

import java.nio.CharBuffer;

public class BufferTest {
	
	
	/*
	 * 
	 * Buffer的初始化：allocate(int capacity)
	 * 
	 * 容量（capacity） 界限 (limit)和位置(position)
	 * 容量：capacity表示该Buffer的最大数据容量,即最多可以存储多少数据。缓冲区的容量不可能为负数，创建后不能改变
	 * 界限：第一个不应该被独处或者羞辱缓冲区位置索引，也就是说，位于limit后数据急不可被读也不可以被写。
	 * 位置：position:用于指明下一个可以被读出或者写入缓冲区位置索引，当Buffer从Channel中读取数据时，position
	 * 的值恰好等于已经读到多少数据。当刚刚建立好一个Buffer对象时候，position为0,如果从Channel中读取了2个数据到Buffer中
	 * 那么position则为2.除此之外，还提供了一个可选标记mark可以将position定位到mark处。
	 * 
	 */
	public static void main(String[] args) {
		
		CharBuffer buffer = CharBuffer.allocate(8);
		System.out.println(buffer.capacity());
		System.out.println(buffer.limit());
		System.out.println(buffer.position());
		
		//放入元素
		buffer.put('a');
		buffer.put('b');
		buffer.put('c');
		
		System.out.println("加入三个元素后,position="+buffer.position());
		
		//调用flip
		buffer.flip();
		System.out.println("调用flip后,limit="+buffer.limit());
		System.out.println("position="+buffer.position());
		
		//去除第一个元素
		System.out.println("第一个元素position=0:"+buffer.get());
		System.out.println("取出一个元素后：position="+buffer.position());
		
		
		//调用clear方法
		buffer.clear();
		System.out.println("执行clear()方法后，limit="+buffer.limit());
		System.out.println("执行clear()方法后，position="+buffer.position());
		
		
		System.out.println("获取clear()获取第三个元素:"+buffer.get(2));
		System.out.println("当前position的位置是:"+buffer.position());
		
		
		
		
	
	}
}
