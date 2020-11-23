package com.gavin.set;

import java.util.Comparator;
import java.util.Date;

public class DateComparator implements Comparator<Date>{
	
	private boolean flag;
	
	public  DateComparator() {
		flag=true;
	}
	public  DateComparator(boolean flag) {
		this.flag=flag;
	}

	@Override
	public int compare(Date o1, Date o2) {
		if(this.flag){
			if(o2.before(o1)){//晚于
				return -1;
			}else{
				return 1;
			}
		}else {
			if(o2.after(o1)){//晚于
				return -1;
			}else{
				return 1;
			}
		}
	}
}
