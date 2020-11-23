package com.gavin.string;

public class StringDemo {
	public static void main(String[] args) {

		// String==字符串类型,用来接收一个连续字符的形式，字符数据类型是在编译的时候就确定了
		// 它是编译阶段会检查一次，是否存在。---因为字符串它属于大文本类型，
		// 存储在：字符串常量池

		// String str = "我是keke";
		// String str1 = "我是keke";
		// str1 = "我爱你";
		// System.out.println(str==str1);

		// String string = "我是keke";
		// String string2 = string;
		// System.out.println(string==string2);
		// System.out.println(string);
		// System.out.println(string2);

		// 产生三个垃圾---字符串常量池里面的不能回收，但是它可以通过后面讲解的StringBuffer和StringBuilder去规避它
//		String str1 = "我是keke";
//		String str2 = "我是" + "ke" + "ke";
//		System.out.println(str1 == str2);// true

		// final String str3 = "我是";//宏变量
		// final String str4 = "keke";
		// final String str5 = str3+str4;

		// System.out.println(str1==str5);//false

		// JDK后面发现--StringBuffer（线程安全）和StringBuilder专门为String的缺点做了一个弥补
		// 都会有一个append方法去动态追加字符串

		// StringBuffer buffer = new StringBuffer();//开辟空间---封装sql的时候有用了
//		StringBuilder builder = new StringBuilder();
//		builder.append("select * from ").append(" tablename ");
//		builder.append(" where 1=1 ");
//		builder.append(" and username='keke' ");
//		builder.append(" and password='123456' ");
		// 调用toString转换字符串，将字符串放入字符串常量池中，存储和使用
		//String string = builder.toString();
		// 使用完毕之后，在某一个阶段会jvm gc进行回收
		//System.out.println(string);

		// StringBuilder 它是非线程安全的，==推荐用它 StringBuffer是线程安全的。

		// 布置一个作业，了解字符串的api方法---API就是jdk提供了很多封装好的现成一些业务和需求，提供程序开发者使用。
		//String string2 = "       	 我爱你520     "; // 其实是一种连续的char[]数组
		// char[] args = ['我','爱','你','5','2','0'] args.length
		//System.out.println(string2.length());
		// 常用的api方法
		// subString 截取
		// replace 单替换
		// replaceAll:全替换
		// split:分割
		// indexOf 查找 (从左向右查找) 如果没找到 返回-1
		// lastIndexOf 查找 (从右向左查找) 如果没找到 返回-1

		// 去掉左右空格 :trim()
		//System.out.println(string2.trim());
		//System.out.println("====================");

		// char之间转换--
		// charAt(index)---返回单个char
		// toCharArray() 转成char[] 

		// 匹配的：
		// startWidth
		// contains
		// endWidth

		// 转大小写

		// 关于任何的，有索引，长度，查找，搜索,排序等一定和数组有关系
		// 关于元素的索引在程序里面都是从0开始，只有一个地方是1,未来在讲
//		String str = "我是keke老师,今年30岁，30以后我就工作了...";
//
//		System.out.println("长度:" + str.length());
//		System.out.println("第一个字符:" + str.charAt(0));
//		System.out.println("第二个字符:" + str.charAt(1));
//		System.out.println("最后一个字符:" + str.charAt(str.length() - 1));
		// char[] cs = str.toCharArray();---看前面的统计字符串中字母有多少，数字有少个
		// System.out.println(cs);

		// javascript 和 java写法几乎一摸一样，只不过java比javascript提供更加丰富而已
		// 你关于java字符串的处理，可以直接拿到javascript去使用
//		System.out.println("转小写:" + str.toLowerCase());// 转小写
//		System.out.println("转大写：" + str.toUpperCase());// 转大写
//
//		System.out.println("====================替换和查找=======================");
//		String str4 = str.replace("30", "20");// 长生一个垃圾
//		System.out.println(str4);

		// 查找--找到元素的索引---判断一个元素是不是在当前字符串中,
		// keke在这这个班级里面没有，如果在，给我你的编号，我要去根据的你编号查询成绩，如果不在
		
		// indexOf 是判断一个关键词是否在当前字符串中，如果存在返回它索引位置，如果不存在返回-1 ===从左往右边查找
		// indexOf(String) ，如果找到返回第一个元素的索引位置，如果没有找到返回-1 0开始找.
		
		// indexOf(String,startIndex),startIndex代表元素从哪个位置开始找。
		// int index = str.indexOf("30",12);
		// System.out.println("我当前的位置是在:"+index);
		// if(index!=-1){
		// System.out.println("你是我班级里面的人，你的成绩是:96分");
		// }else{
		// System.out.println("没有找到该学生!!!");
		// }

		// lastIndexOf 是判断一个关键词是否在当前字符串中，如果存在返回它索引位置，如果不存在返回-1 === 从右往左边查找
		// lastIndexOf(String) 从左往右边查找，如果找到返回第一个元素的索引位置，如果没有找到返回-1 0开始找.
		// lastIndexOf(String,startIndex),startIndex代表元素从哪个位置开始往前查询。都是决定起跑线
		
//		String str8 = "我是keke老师,今年30岁，30以后我就工作了30...o";
//		int index = str8.lastIndexOf("30");
//		System.out.println("==我当前的位置是在:" + index);
//		if (index != -1) {
//			System.out.println("你是我班级里面的人，你的成绩是:96分");
//		} else {
//			System.out.println("没有找到该学生!!!");
//		}
//
//		System.out.println("=====================替换 replace replaceAll=======================");

		// String str9="我是keke老师,今年300岁，30以后我就工作了30...o";
		// String str10 = str9.replace("30", "20");
		// System.out.println(str10);
		//
		// String str11 = str9.replaceAll("(\\d){3}", "20");
		// System.out.println(str11);

//		String url = "http://www.baidu.com";
//		System.out.println(url.startsWith("http://"));
//		System.out.println(url.endsWith("com"));
//		System.out.println(url.contains("bais"));
//
		String bank = " ";
		System.out.println(bank.isEmpty());
		System.out.println(bank.trim().isEmpty());

		// String name = null ;
		// System.out.println(name.charAt(0));//Exception in thread "main"
		// java.lang.NullPointerException

		// 分割
//		String str12 = "keke我xiaobai我shubiao";
//		String[] names = str12.split("我");
//		for (String string3 : names) {
//			System.out.println(string3);
//		}

		// substring

		// 忽略大小写的对比 eqauls
//		String str14 = "abc";
//		String str15 = "ABC";
		// System.out.println(str14.toLowerCase().equals(str15.toLowerCase()));
		//System.out.println(str14.equalsIgnoreCase(str15));

		// substring--static
//		char[] cs = { '我', '爱', '你' };
//		String string4 = String.copyValueOf(cs);
//		System.out.println(string4);

		// subString es7
//		String teString = String.format("我爱你%s%s", "keke", "zhangsan");
//		System.out.println("teString----"+teString);

		// subString
		//String string3 = "0123456789";
		// string3.substring(beginIndex) 截取到最后---substring(begin,length-1);
		// string3.substring(beginIndex, endIndex)//含头不含尾

//		System.out.println(string3.substring(2));
//		System.out.println(string3.substring(2, 4));

	}

}
