package com.gavin.lambda.stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:Joining
 * @Description:joining可以将stream中的元素用特定的连接符（没有的话，则直接连接）连接成一个字符串。
 * @Author: gaoming
 * @Date:2021/1/27 10:27
 * @Version 1.0
 */
public class Joining {
    public static void main(String[] args) {
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));

        String names = personList.stream().map(p -> p.getName()).collect(Collectors.joining(","));
        System.out.println("所有员工的姓名：" + names);
        List<String> list = Arrays.asList("A", "B", "C");
        String string = list.stream().collect(Collectors.joining("-"));
        System.out.println("拼接后的字符串：" + string);
    }
}
