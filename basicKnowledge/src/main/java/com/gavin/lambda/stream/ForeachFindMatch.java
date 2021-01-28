package com.gavin.lambda.stream;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:StreamTest
 * @Description:
 * @Author: gaoming
 * @Date:2021/1/26 16:32
 * @Version 1.0
 */
public class ForeachFindMatch {
    public static void main(String[] args) {
        // Stream也是支持类似集合的遍历和匹配元素的，只是Stream中的元素是以Optional类型存在的。
        List<Integer> list = Arrays.asList(7, 6, 9, 3, 8, 2, 1);
        // 遍历输出符合条件的元素
        list.stream().filter(x -> x > 6).forEach(System.out::println);
        // 匹配第一个
        Optional<Integer> findFirst = list.stream().filter(x -> x > 6).findFirst();

        // 匹配任意（适用于并行流）
        Optional<Integer> findAny = list.parallelStream().filter(x -> x > 6).findAny();
        // 是否包含符合特定条件的元素
        boolean anyMatch = list.stream().anyMatch(x -> x < 6);
        System.out.println("匹配第一个值：" + findFirst.get());
        System.out.println("匹配任意一个值：" + findAny.get());
        System.out.println("是否存在大于6的值：" + anyMatch);
    }
}
