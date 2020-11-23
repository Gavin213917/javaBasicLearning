package com.gavin.set;

import java.util.Comparator;

public class ObjectComparator2 implements Comparator<Student> {
	private boolean mark = true;

	public ObjectComparator2(boolean mark) {
		this.mark = mark;
	}

	@Override
	public int compare(Student o1, Student o2) {
		return mark ? o1.getAge() - o2.getAge() : o2.getAge() - o1.getAge();
	}

}