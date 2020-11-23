package com.gavin.stack;

public class StackTest {
	
	Object[] stacks; //栈容器
	int size;//栈的大小
	int top;//记录位置
	int len;
	
	StackTest(int size){
		this.size=size;
		this.stacks=new Object[this.size];
		this.top = -1;
	}
	
	/*
	 * 1：出栈 pop
	 * 2：入栈 push
	 * 3: 获取栈顶的元素 peek()
	 * 4: 栈空判断 isEmpty
	 * 5: 栈是否已满 isFull
	 * 
	 * */
	
	// 获取栈顶元素
	public Object peek(){
		return this.stacks[top];
	}
	
	// 判断栈是否为空
	public boolean isEmpty(){
		return size()==0;
	}
	
	//栈是否已满
	public boolean isFull(){
		return top==size-1;
	}
	
	// 入栈的过程
	public void push(Object val){
		len++;
		stacks[++this.top]=val;
	}
	
	// 出栈过程
	public Object pop(){
		len--;
		return stacks[this.top--];
	}
	
	// 获取长度
	public int size(){
		return this.len;
	}
	
	// 清空栈
	public void clear(){
		this.size=0;
		this.top=-1;
		this.len=0;
		this.stacks=new Object[this.size];
	}
	
	
	public static void main(String[] args) {
		StackTest stackDemo=new StackTest(10);
//		System.out.println(stackDemo.isEmpty());
//		System.out.println(stackDemo.isEmpty());
		stackDemo.push(1);
		stackDemo.push(2);
		stackDemo.push(3);
		stackDemo.push(4);
		stackDemo.push(5);
		stackDemo.push(6);
		stackDemo.push(7);
		stackDemo.push(8);
		stackDemo.push(9);
		stackDemo.push(10);
		System.out.println(stackDemo.isFull());
		System.out.println("出栈之前："+stackDemo.size());
		System.out.println(stackDemo.pop());
		System.out.println("出栈之后："+stackDemo.size());
		System.out.println(stackDemo.peek());
	}
	
}
