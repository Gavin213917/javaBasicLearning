package com.gavin.lambda.stream;

import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:CountAveraging
 * @Description:Collectors提供了一系列用于数据统计的静态方法：
 *              计数：count
 *              平均值：averagingInt、averagingLong、averagingDouble
 *              最值：maxBy、minBy
 *              求和：summingInt、summingLong、summingDouble
 *              统计以上所有：summarizingInt、summarizingLong、summarizingDouble
 * @Author: gaoming
 * @Date:2021/1/27 10:14
 * @Version 1.0
 */
public class CountAveraging {
    public static void main(String[] args) {
        // 案例：统计员工人数、平均工资、工资总额、最高工资。
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));

        // 求总数
        Long count = personList.stream().collect(Collectors.counting());
        // 求平均工资
        Double average = personList.stream().collect(Collectors.averagingDouble(Person::getSalary));
        // 求最高工资
        Optional<Integer> max = personList.stream().map(Person::getSalary).collect(Collectors.maxBy(Integer::compare));
        // 求工资之和
        Integer sum = personList.stream().collect(Collectors.summingInt(Person::getSalary));
        // 一次性统计所有信息
        DoubleSummaryStatistics collect = personList.stream().collect(Collectors.summarizingDouble(Person::getSalary));

        System.out.println("员工总数：" + count);
        System.out.println("员工平均工资：" + average);
        System.out.println("员工工资总和：" + sum);
        System.out.println("员工工资所有统计：" + collect);
    }
}
