package com.gavin.list;

import java.util.LinkedList;
import java.util.PriorityQueue;

public class LinkedListDemo {

	public static void main(String[] args) {
		LinkedList<Integer> integers = new LinkedList<>();
		integers.add(1);
		integers.add(2);
		integers.add(3);
		integers.add(4);
		integers.add(5);
		
		//双向链表---栈,队列的机制
//		System.out.println(integers.get(1));
//		System.out.println(integers.get(1));
//		integers.peek();
//		integers.poll()
		
		
		//LinkedList是Queue+List的融合
		//双向的队列---
		//Queue 先进先出-
		//栈：先进后出的概念
//		Queue<Integer> queue =new ArrayDeque<>();
		// PriorityQueue 单项队列 ,优先队列
		PriorityQueue<Integer> queue =new PriorityQueue(100);//添加固定长度的时候，offer要比add性能要好
		
		queue.offer(-3);
		queue.offer(1);
		queue.offer(88);
		queue.offer(77);
		queue.offer(2);
		queue.offer(-8);
		
		//heap算法--堆算法--二叉树---图-Map
		

		
		//人在买票---随机数--
		//你定义的全局队列对象---页面中你做抢票的按钮-
		
		//买东子
		
		//添加元素的几种方式：add() offer
		
		
		for (Integer integer : queue) {
			System.out.print(integer+"\t");
		}
		
		System.out.println("");
		System.out.println(queue.peek());//获取是队列头元素,不删除队列的元素
		System.out.println(queue.poll());//获取是队列头元素,删除队列中的元素
		System.out.println(queue.remove(88));//删除队列中指定的元素
		//queue.element();//等价于peek()方法
		//queue.remove();等价于poll();
		//offer()等价于add();
		
		for (Integer integer : queue) {
			System.out.print(integer+"\t");
		}
	}

}
