package com.gavin.lambda.stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:Reduce
 * @Description:归约，也称缩减，顾名思义，是把一个流缩减成一个值，能实现对集合求和、求乘积和求最值操作。
 * @Author: gaoming
 * @Date:2021/1/27 9:42
 * @Version 1.0
 */
public class Reduce {
    public static void main(String[] args) {
        //案例一：求Integer集合的元素之和、乘积和最大值。
        List<Integer> list = Arrays.asList(1, 3, 2, 8, 11, 4);
        // 求和方式1
        Optional<Integer> sumA = list.stream().reduce((x, y) -> x + y);
        // 求和方式2
        Optional<Integer> sumB = list.stream().reduce(Integer::sum);
        // 求和方式3
        Integer sumC = list.stream().reduce(0, Integer::sum);

        // 求乘积
        Optional<Integer> product = list.stream().reduce((x, y) -> x * y);

        // 求最大值方式1
        Optional<Integer> maxA = list.stream().reduce((x, y) -> x > y ? x : y);
        // 求最大值写法2
        Integer maxB = list.stream().reduce(1, Integer::max);

        System.out.println("list求和：" + sumA.get() + "," + sumB.get() + "," + sumC);
        System.out.println("list求积：" + product.get());
        System.out.println("list求和：" + maxA.get() + "," + maxB);

        //案例二：求所有员工的工资之和和最高工资。
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));
        personList.add(new Person("Owen", 9500, 25, "male", "New York"));
        personList.add(new Person("Alisa", 7900, 26, "female", "New York"));

        // 求工资之和方式1：
        Optional<Integer> sumSalary = personList.stream().map(Person::getSalary).reduce(Integer::sum);
        // 求工资之和方式2：
        Integer sumSalary2 = personList.stream().reduce(0, (sum, p) -> sum += p.getSalary(),
                (sum1, sum2) -> sum1 + sum2);
        // 求工资之和方式3：
        Integer sumSalary3 = personList.stream().reduce(0, (sum, p) -> sum += p.getSalary(), Integer::sum);

        // 求最高工资方式1：
        Integer maxSalary = personList.stream().reduce(0, (max, p) -> max > p.getSalary() ? max : p.getSalary(),
                Integer::max);
        // 求最高工资方式2：
        Integer maxSalary2 = personList.stream().reduce(0, (max, p) -> max > p.getSalary() ? max : p.getSalary(),
                (max1, max2) -> max1 > max2 ? max1 : max2);

        System.out.println("工资之和：" + sumSalary.get() + "," + sumSalary2 + "," + sumSalary3);
        System.out.println("最高工资：" + maxSalary + "," + maxSalary2);

    }
}
