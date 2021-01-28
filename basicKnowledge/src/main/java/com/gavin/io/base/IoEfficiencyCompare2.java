package com.gavin.io.base;

import java.io.*;

/**
 * @Description:IO流效率对比
 * @对比下普通字节流和缓冲字节流的效率：
 * @要想对比普通字节流和缓冲字节流的效率差距，就要避免直接读写较长的字符串，于是，设计了下面这个对比案例：用字节流和缓冲字节流分别复制文件。
 * @Author: gaoming
 * @Date:2021/1/27 11:28
 * @Version 1.0
 */
public class IoEfficiencyCompare2 {
    public static void main(String[] args) throws IOException {
        File data = new File("C:/gavin/data.zip");
        File a = new File("C:/gavin/a.zip");
        File b = new File("C:/gavin/b.zip");

        StringBuilder sb = new StringBuilder();

        long start = System.currentTimeMillis();
        copy(data, a);
        long end = System.currentTimeMillis();

        long start2 = System.currentTimeMillis();
        bufferedCopy(data, b);
        long end2 = System.currentTimeMillis();

        System.out.println("普通字节流耗时：" + (end - start) + " ms");
        System.out.println("缓冲字节流耗时：" + (end2 - start2) + " ms");
    }

    // 普通字节流
    public static void copy(File in, File out) throws IOException {
        // 封装数据源
        InputStream is = new FileInputStream(in);
        // 封装目的地
        OutputStream os = new FileOutputStream(out);

        int by = 0;
        while ((by = is.read()) != -1) {
            os.write(by);
        }
        is.close();
        os.close();
    }

    // 缓冲字节流
    public static void bufferedCopy(File in, File out) throws IOException {
        // 封装数据源
        BufferedInputStream bi = new BufferedInputStream(new FileInputStream(in));
        // 封装目的地
        BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(out));

        int by = 0;
        while ((by = bi.read()) != -1) {
            bo.write(by);
        }
        bo.close();
        bi.close();
    }
}

