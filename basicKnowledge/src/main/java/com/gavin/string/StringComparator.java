package com.gavin.string;

import java.util.Comparator;
import com.gavin.utils.TmPinyinUtil;

/**
 * 字符串排序 StringComparator 
* @ClassName: StringComparator  
* @Description: TODO(这里用一句话描述这个类的作用)  
* @author Gavin  
* @date 2019年5月22日  
*
 */
public class StringComparator implements Comparator<String> {
	private boolean mark;

	public StringComparator() {
	}

	public StringComparator(boolean mark) {
		this.mark = mark;
	}

	// 根据字符串的首字母进行排序
	@Override
	public int compare(String o1, String o2) {
		int a = TmPinyinUtil.getPinYinHeadChar(StringUtils.getFirstChar(o1)).toLowerCase().charAt(0);
		int b = TmPinyinUtil.getPinYinHeadChar(StringUtils.getFirstChar(o2)).toLowerCase().charAt(0);
		if (a > b) {
			return mark ? 1 : -1;
		} else if (a < b) {
			return mark ? -1 : 1;
		} else {
			return 0;// 相同时候不排序
		}
	}

}
