package com.gavin.utils;

import java.util.HashMap;
import java.util.Map;

public class PageUtils {

    /**
     *
     * @param total 总条数
     * @param rows  每页多少条
     * @param page  第几页
     * @return
     */
    public static Map<String,String> getPage(Integer total,Integer rows,Integer page){
        if (null==rows ||null==page || rows==0 || page==0){
            return null;
        }
        Map<String, String> countMap = new HashMap<String, String>();
        Integer curRow = ((page - 1) * rows) + 1;
        Integer countPage = 0;
        if (0==total%rows){
            countPage=total/rows;
        }else {
            countPage=total/rows+1;
        }
        countMap.put("page", page.toString());//第几页
        countMap.put("rows", rows.toString());//每页多少条
        countMap.put("curRow", curRow.toString());//当前页起始行数
        countMap.put("total", total.toString());//总条数
        countMap.put("countPage", countPage.toString());//共多少页
        return countMap;
    }

}
