package com.gavin.lambda.s1;

public class LambdaQs {

	
	public void eat(Eatable eatable){
		System.out.println(eatable);
		eatable.taste();
	}
	
	public void driver(Flyable flayable){
		flayable.fly("���������ú�!!!");
	}
	
	public int test(Addable add){
		return add.add(5, 3);
	}
	
	
	/*
		Lambda���ʽ,��jdk8�������ԣ�����ʹ�ø����Ĵ���������ֻ��"һ�����󷽷�"��"�ӿ�"��ʵ����
		
		1������ӿڣ�ֻ��һ�������������ʹ��lambda���ʽ,@FunctionalInterface ���߽ӿڲ������������ĳ��󷽷�
		
		Lambda���ʽ����Ҫ���þ�����������ڲ���ķ����﷨��������������ɣ�
		1���β��б�,�β��б�����ʡ���β����ͣ�����β��б�ֻ��һ���������������β��б������Ҳ����ʡ�ԡ�
		2:��ͷ(->) 
		3:����飺
	*/
	
	public static void main(String[] args) {
		
		LambdaQs qs = new LambdaQs();
		qs.eat(()->System.out.println("�������ʲ�N?"));
		qs.eat(()->{
			System.out.println("�������ʲ�N?22222222");
		});
		
		//ֻ��һ�������Ļ�������ʡȥԲ����
//		qs.driver(weather->{
//			System.out.println("����������:"+weather);
//			System.out.println("�҂�ȥ���[��!!!");
//		});
		
//		qs.driver(new Flayable() {
//			
//			@Override
//			public void fly(String weather) {
//				System.out.println("����������:"+weather);
//				System.out.println("�҂�ȥ���[��!!!");
//			}
//		});
		
		int result = qs.test((a,b)->a*b);
		System.out.println(result);
	}
}
