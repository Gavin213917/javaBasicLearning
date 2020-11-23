package com.gavin.string;

import java.util.ArrayList;
import java.util.List;

public class StringSort {

	public static void main(String[] args) {
		List<String> classrooms = new ArrayList<>();
		classrooms.add("异步 Y");//0
		classrooms.add("eden E ");//1
		classrooms.add("努力 N ");//2
		classrooms.add("阿飞 A ");//3
		classrooms.add("简单就是美 J ");//4
		classrooms.add("大帅 D ");//5
		classrooms.add("jamie J ");//6
		classrooms.add("任 R ");//7
		classrooms.add("Boolean B ");//8
		classrooms.add("小布丁 X ");//9
		classrooms.add("蚂蚁 M ");//10
		

		//replaceAll
//		classrooms.sort(new Comparator<String>() {
//			//根据字符串的首字母进行排序
//			@Override
//			public int compare(String o1, String o2) {
//				int a=TmPinyinUtil.getPinYinHeadChar(StringUtils.getFirstChar(o1)).toLowerCase().charAt(0);
//				int b=TmPinyinUtil.getPinYinHeadChar(StringUtils.getFirstChar(o2)).toLowerCase().charAt(0);
//				if(a>b){
//					return 1;
//				}else if(a<b){
//					return -1;
//				}else{
//					return 0;
//				}
//			}
//		});
		
		classrooms.sort(new StringComparator());
		
		for (String num : classrooms) {
			System.out.println("===="+num);
		}

	}

}
