package com.gavin.utils;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 线程池创建
 */
public class ThreadPoolFactory {

    private static ExecutorService executorService = Executors.newFixedThreadPool(100);

    public static ExecutorService instanceThreadPool() {
        if (executorService == null) {
            executorService = Executors.newFixedThreadPool(100);
        }
        return executorService;
    }
}
