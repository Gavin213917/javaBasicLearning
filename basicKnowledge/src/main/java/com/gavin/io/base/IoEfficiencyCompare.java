package com.gavin.io.base;

import java.io.*;

/**
 * @Description:IO流效率对比
 * @对比下普通字节流和缓冲字节流的效率：
 * @测试的结果，差别不是很大
 * @原因：如果请求长度超过输出缓冲区的大小，刷新输出缓冲区，然后直接写入数据。这样，缓冲流将无害地级联。
 * @Author: gaoming
 * @Date:2021/1/27 11:28
 * @Version 1.0
 */
public class IoEfficiencyCompare {
    public static void main(String[] args) throws IOException {
        File file = new File("C:/gavin/test.txt");
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3000000; i++) {
            sb.append("abcdefghigklmnopqrstuvwsyz");
        }
        byte[] bytes = sb.toString().getBytes();

        long start = System.currentTimeMillis();
        write(file, bytes);
        long end = System.currentTimeMillis();

        long start2 = System.currentTimeMillis();
        bufferedWrite(file, bytes);
        long end2 = System.currentTimeMillis();

        System.out.println("普通字节流耗时：" + (end - start) + " ms");
        System.out.println("缓冲字节流耗时：" + (end2 - start2) + " ms");

    }

    // 普通字节流
    public static void write(File file, byte[] bytes) throws IOException {
        OutputStream os = new FileOutputStream(file);
        os.write(bytes);
        os.close();
    }

    // 缓冲字节流
    public static void bufferedWrite(File file, byte[] bytes) throws IOException {
        BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(file));
        bo.write(bytes);
        bo.close();
    }
}
