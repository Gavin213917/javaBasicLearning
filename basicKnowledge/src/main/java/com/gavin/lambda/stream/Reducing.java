package com.gavin.lambda.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:Reducing
 * @Description:Collectors类提供的reducing方法，相比于stream本身的reduce方法，增加了对自定义归约的支持
 * @Author: gaoming
 * @Date:2021/1/27 10:29
 * @Version 1.0
 */
public class Reducing {
    public static void main(String[] args) {
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));

        // 每个员工减去起征点后的薪资之和（这个例子并不严谨，但一时没想到好的例子）
        Integer sum = personList.stream().collect(Collectors.reducing(0, Person::getSalary, (i, j) -> (i + j - 5000)));
        System.out.println("员工扣税薪资总和：" + sum);

        // stream的reduce
        Optional<Integer> sum2 = personList.stream().map(Person::getSalary).reduce(Integer::sum);
        System.out.println("员工薪资总和：" + sum2.get());
    }
}
