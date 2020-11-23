package com.gavin.io;

import java.io.*;

public class Test1 {

    /*
     *
     * 1:讲文本内容写入到文件中
     *
     * 输入流和输出流
     *
     * 字节流和字符流（底层转化成字节流）
     *
     * InputstreamReader
     * InputStreamWriter
     * */


    public static void main(String[] args) {
        try (

                //输入流--字节流
                FileInputStream in  = new FileInputStream(new File("c:/test/4.jpg"));
                //转成字符流char
                InputStreamReader reader = new InputStreamReader(in);

                //输出流
                FileOutputStream out = new FileOutputStream(new File("c://test/44.jpg"));
                OutputStreamWriter writer = new OutputStreamWriter(out);
        ){
            byte[] c = new byte[1024];
            int len = 0;
            while((len=in.read(c))!=-1){
                out.write(c,0,len);
            }
        } catch (Exception e) {
        }
    }
}
