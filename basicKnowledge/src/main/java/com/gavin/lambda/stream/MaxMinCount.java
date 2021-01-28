package com.gavin.lambda.stream;

import java.util.*;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:MaxMinCount
 * @Description:max、min、count这些字眼你一定不陌生，没错，在mysql中我们常用它们进行数据统计。
 * Java stream中也引入了这些概念和用法，极大地方便了我们对集合、数组的数据统计工作。
 * @Author: gaoming
 * @Date:2021/1/26 18:18
 * @Version 1.0
 */
public class MaxMinCount {
    public static void main(String[] args) {
        //案例一：获取String集合中最长的元素。
        List<String> list1 = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");

        Optional<String> max1 = list1.stream().max(Comparator.comparing(String::length));
        System.out.println("最长的字符串：" + max1.get());

        //案例二：获取Integer集合中的最大值。
        List<Integer> list = Arrays.asList(7, 6, 9, 4, 11, 6);
        // 自然排序
        Optional<Integer> max = list.stream().max(Integer::compareTo);
        // 自定义排序
        Optional<Integer> max2 = list.stream().max(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1.compareTo(o2);
            }
        });
        System.out.println("自然排序的最大值：" + max.get());
        System.out.println("自定义排序的最大值：" + max2.get());

        //案例三：获取员工工资最高的人。
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));
        personList.add(new Person("Owen", 9500, 25, "male", "New York"));
        personList.add(new Person("Alisa", 7900, 26, "female", "New York"));

        Optional<Person> max3 = personList.stream().max(Comparator.comparingInt(Person::getSalary));
        System.out.println("员工工资最大值：" + max3.get().getSalary());

        // 案例四：计算Integer集合中大于6的元素的个数。
        List<Integer> list5 = Arrays.asList(7, 6, 4, 8, 2, 11, 9);

        long count = list5.stream().filter(x -> x > 6).count();
        System.out.println("list中大于6的元素个数：" + count);
    }
}
