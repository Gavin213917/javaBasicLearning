package com.gavin.map;

import java.util.HashMap;
import java.util.Map;

/**
 * @version 1.0
 * @author: liskov
 * @date:2021/2/23 14:30
 */
public class HashMapTest {
    public static void main(String[] args) {
        /*
         * 1、hashMap 中的hashCode 是怎么生成的？
         * 会调用key的hashCode ，然后对其进行 异或运算、右移运算（进行右移运算是为了增加hashmap 的散列性，是元素分的更开，增加get的效率，减少碰撞）
         *
         **/
//        HashMap<String, String> hashMap = new HashMap<>();
//        hashMap.put("1","haha");
//        hashMap.get("1");
        int a = 11;
        Boolean flag = a >2 || a<10;
        Boolean flag1 = a >2 && a<10;
        System.out.println(flag);
        System.out.println(flag1);
    }
}
