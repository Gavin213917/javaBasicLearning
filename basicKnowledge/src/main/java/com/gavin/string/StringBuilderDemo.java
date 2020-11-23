package com.gavin.string;

public class StringBuilderDemo {
	
	public static void main(String[] args) {
		
		
//		Byte Short Integer Long -128-127 
		
//		Integer a = 12; 
//		Integer b = 12;
//		System.out.println(a==b);
//		
//		Integer aa = 128; 
//		Integer bb = 128;
//		System.out.println(aa==bb);
//		System.out.println(aa.equals(bb));
		
		
		//如果是基础数据类型，他们值比较和数据类型无关
//		int ac=10;
//		double bc=10f;
//		System.out.println(ac==bc);
//		System.out.println(null.eqauls(null));//A正确 B不正确   B  nullpointException 
//		System.out.println(null==null);////A正确B不正确  A
				
//		//编译(成员变，方便，静态)和运行(执行方法)
		String a1 = "123456789";//Char
		final String a2 = "12345";
		final String a3 = "6789";
		
		String a4 = a2+a3;//编译阶段就确定
		String a5 = "12345"+a3;
		String a6 = "123456789";
		
		System.out.println(a1==a6);//运行阶段
		System.out.println(a1==a4);//运行阶段
		System.out.println(a1==a5);//运行阶段
		
		System.out.println(a4);//运行阶段
		
		
		//在java开发过程中只有两个数据类型：数字和布尔
		//byte short int long float double char=--数值型
		//boolean---布尔型
		
		StringBuffer buffer= new StringBuffer();
		buffer.append("123456").append("aaa");
		buffer.append("789");
		System.out.println(buffer.toString());
		
	}
}
