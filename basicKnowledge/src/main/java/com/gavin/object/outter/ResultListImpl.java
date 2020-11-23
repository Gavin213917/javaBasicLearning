package com.gavin.object.outter;

import java.util.ArrayList;
import java.util.List;

public class ResultListImpl implements IResultList {

	@Override
	public List<String> queryList() {
		List<String> strings = new ArrayList<>();
		strings.add("keke");
		strings.add("zhangsan");
		strings.add("xiaobai");
		strings.add("xiaoxiong");
		return strings;
	}

}
