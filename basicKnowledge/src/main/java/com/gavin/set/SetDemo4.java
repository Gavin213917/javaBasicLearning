package com.gavin.set;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.PrimitiveIterator.OfInt;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.Stream;


public class SetDemo4 {
	public static void main(String[] args) {
		HashSet<Integer> ages = new HashSet<>();
		ages.add(10);
		ages.add(20);
		ages.add(30);
		ages.add(40);
		ages.add(50);
		
		Optional<Integer> noptional=ages.stream().max(new IntegerComparator(true));
		System.out.println(noptional.get());
		Optional<Integer> moptional=ages.stream().min(new IntegerComparator(false));
		System.out.println(moptional.get());
//		System.out.println(ages.stream().count());
//		System.out.println("过滤后的元素====");
//		Stream<Integer> ages2=ages.stream().filter(age->age>20);
//		Iterator<Integer> int1 =ages2.iterator();
//		while(int1.hasNext()){
//			System.out.println(int1.next().intValue());
//		}
		
		//ages.stream().filter(age->age>20).forEach(new SetDemo4()::print);
		//java8-提供对集合提供了一个Stream操作集合--Collection提供的
		//Stream--- IntStream DoubleStream LongStream
		IntStream is= IntStream.builder()
				.add(10)
				.add(30)
				.add(30)
				.add(40)
				.build();
		//求数组的平均数。最大值，最小值，总和，总数
//		System.out.println("找到第一个元素"+is.findAny().getAsInt());
//		System.out.println("找到intstream最大值:"+is.max().getAsInt());
//		System.out.println("找到intstream最小值:"+is.min().getAsInt());
//		System.out.println("找到intstream总和:"+is.sum());
//		System.out.println("找到intstream总数:"+is.count());
//		System.out.println("找到intstream平均数:"+is.average().getAsDouble());
//		IntStream nums =is.map(ele->ele+10);
//		nums.forEach(a->System.out.println(a));
		
		
		
//		IntStream nums = is.distinct();//去重
//		nums.forEach(a->System.out.println(a));
		
//		IntStream nums2=is.filter(num->num>20);//过滤
//		nums2.forEach(a->System.out.println(a));
		
//		System.out.println("返回任意一个元素:"+nums.findAny().getAsInt());
		
		//循环获取stream元素
//		OfInt int1 =nums.iterator();
//		while(int1.hasNext()){
//			System.out.println(int1.next().intValue());
//		}
		

		//Byte Short Interger Long -127-128--都是true
//		Integer a=10;
//		Integer b=10;
//		Integer a=130;
//		Integer b=130;
		
		//同类型的数据类型用equals比较是肯定相等的，不是同种数据类型是不相等的，equals 比较的是hashcode 的值。
		//==是内存地址比较
		
//		System.out.println(a.equals(b));//true
//		System.out.println(a.equals(b));//true
		
		
	
	}
	
	public void print(Integer age){
		System.out.println(age);
	}
	

}
