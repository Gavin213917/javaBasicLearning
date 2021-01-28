package com.gavin.io.base;

import java.io.*;

/**
 * @Description:InputStreamReader、OutputStreamWriter（字符流）
 * @字符流适用于文本文件的读写，OutputStreamWriter类其实也是借助FileOutputStream类实现的，故其构造方法是FileOutputStream的对象
 * @Author: gaoming
 * @Date:2021/1/27 11:08
 * @Version 1.0
 */
public class InputOrOutputStreamReader {
    public static void write(File file) throws IOException {
        // OutputStreamWriter可以显示指定字符集，否则使用默认字符集
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(file, true), "UTF-8");

        // 要写入的字符串
        String string = "松下问童子，言师采药去。只在此山中，云深不知处。";
        osw.write(string);
        osw.close();
    }

    public static String read(File file) throws IOException {
        InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");
        // 字符数组：一次读取多少个字符
        char[] chars = new char[1024];
        // 每次读取的字符数组先append到StringBuilder中
        StringBuilder sb = new StringBuilder();
        // 读取到的字符数组长度，为-1时表示没有数据
        int length;
        // 循环取数据
        while ((length = isr.read(chars)) != -1) {
            // 将读取的内容转换成字符串
            sb.append(chars, 0, length);
        }
        // 关闭流
        isr.close();

        return sb.toString();
    }
}
