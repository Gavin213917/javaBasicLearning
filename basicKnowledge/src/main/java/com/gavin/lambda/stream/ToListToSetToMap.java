package com.gavin.lambda.stream;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:ToListToSetToMap
 * @Description:因为流不存储数据，那么在流中的数据完成处理后，需要将流中的数据重新归集到新的集合里。
 * toList、toSet和toMap比较常用，另外还有toCollection、toConcurrentMap等复杂一些的用法。
 * @Author: gaoming
 * @Date:2021/1/27 10:04
 * @Version 1.0
 */
public class ToListToSetToMap {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 6, 3, 4, 6, 7, 9, 6, 20);
        List<Integer> listNew = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toList());
        Set<Integer> set = list.stream().filter(x -> x % 2 == 0).collect(Collectors.toSet());

        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));

        Map<?, Person> map = personList.stream().filter(p -> p.getSalary() > 8000)
                .collect(Collectors.toMap(Person::getName, p -> p));
        System.out.println("toList:" + listNew);
        System.out.println("toSet:" + set);
        System.out.println("toMap:" + map);

    }
}
