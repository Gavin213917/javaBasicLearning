package com.gavin.file;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import com.gavin.string.StringUtils;

import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.FileImageOutputStream;


public class FileUtil {


    private static List<File> files = new ArrayList<>();

    /**
     * 递归获取目录下所有的文件信息
     *
     * @param directory
     * @return
     * @throws
     * @Title: listFiles
     * @author: Gavin
     * @time: 2019年7月2日 下午5:42:51
     * @return: List<File>
     */
    public static List<File> listFiles(File directory) {
        File[] files2 = directory.listFiles();
        for (File file : files2) {
            if (file.isFile()) {
                files.add(file);
            }
            if (file.isDirectory()) {//如果是目录，继续调用自己
//				files.add(file);
                listFiles(file);
            }
        }

        return files;
    }


    /**
     * 递归获取目录下所有带后缀的文件信息
     *
     * @param directory
     * @param filterDirectory
     * @param suffix
     * @return
     * @throws
     * @Title: listFiles
     * @author: Gavin
     * @time: 2019年7月2日 下午5:43:09
     * @return: List<File>
     */
    public static List<File> listFiles(File directory, String filterDirectory, String suffix) {
        File[] files2 = directory.listFiles(new FilenameFilter() {//过滤filterDirectory目录，获得带后缀suffix的文件的信息
            @Override
            public boolean accept(File dir, String name) {
                if (StringUtils.isNotEmpty(filterDirectory)) {
                    return !name.equals(filterDirectory);
                } else {
                    return true;
                }
            }
        });
        for (File file : files2) {
            if (file.isFile()) {
                if (suffix != null && file.getName().endsWith(suffix)) {
                    files.add(file);
                }

                if (suffix == null) {
                    files.add(file);
                }
            }
            if (file.isDirectory()) {//如果是目录，继续调用自己
//				files.add(file);
                listFiles(file, filterDirectory, suffix);
            }
        }

        return files;
    }

    /**
     * 递归获取目录下所有的文件信息
     *
     * @param files
     * @param directory
     * @return
     * @throws
     * @Title: listFiles
     * @author: Gavin
     * @time: 2019年7月2日 下午5:43:30
     * @return: List<File>
     */
    public static List<File> listFiles(List<File> files, File directory) {
        File[] files2 = directory.listFiles();
        for (File file : files2) {
            if (file.isFile()) {
                files.add(file);
            }
            if (file.isDirectory()) {//如果是目录，
                listFiles(files, file);
            }
        }

        return files;
    }

    /**
     * @param directory
     * @return
     * @throws
     * @Title: listFiles
     * @author: Gavin
     * @time: 2019年7月2日 下午5:43:46
     * @return: List<File>
     */
    public static List<File> listFiles(String directory) {
        return listFiles(new File(directory));
    }

    /**
     * @return byte[]
     * @Author gaoming
     * @Description TODO 图片转byte数组
     * @Date 16:58 2020/10/9
     * @Param [path]
     **/
    public byte[] image2byte(String path) {
        byte[] data = null;
        FileImageInputStream input = null;
        try {
            input = new FileImageInputStream(new File(path));
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            byte[] buf = new byte[1024];
            int numBytesRead = 0;
            while ((numBytesRead = input.read(buf)) != -1) {
                output.write(buf, 0, numBytesRead);
            }
            data = output.toByteArray();
            output.close();
            input.close();
        } catch (FileNotFoundException ex1) {
            ex1.printStackTrace();
        } catch (IOException ex1) {
            ex1.printStackTrace();
        }
        return data;
    }

    /**
     * @return void
     * @Author gaoming
     * @Description //TODO byte数组到图片
     * @Date 16:59 2020/10/9
     * @Param [data, path]
     **/
    public void byte2image(byte[] data, String path) {
        if (data.length < 3 || path.equals("")) return;
        try {
            FileImageOutputStream imageOutput = new FileImageOutputStream(new File(path));
            imageOutput.write(data, 0, data.length);
            imageOutput.close();
            System.out.println("Make Picture success,Please find image in " + path);
        } catch (Exception ex) {
            System.out.println("Exception: " + ex);
            ex.printStackTrace();
        }
    }

    /**
     * @return String
     * @Author gaoming
     * @Description //TODO byte数组到16进制字符串
     * @Date 16:59 2020/10/9
     * @Param [data]
     **/
    public String byte2string(byte[] data) {
        if (data == null || data.length <= 1) return "0x";
        if (data.length > 200000) return "0x";
        StringBuffer sb = new StringBuffer();
        int buf[] = new int[data.length];
        //byte数组转化成十进制
        for (int k = 0; k < data.length; k++) {
            buf[k] = data[k] < 0 ? (data[k] + 256) : (data[k]);
        }
        //十进制转化成十六进制
        for (int k = 0; k < buf.length; k++) {
            if (buf[k] < 16) sb.append("0" + Integer.toHexString(buf[k]));
            else sb.append(Integer.toHexString(buf[k]));
        }
        return "0x" + sb.toString().toUpperCase();
    }

    /**
     * 判断指定的文件或文件夹删除是否成功
     *
     * @param FileName 文件或文件夹的路径
     * @return true or false 成功返回true，失败返回false
     */
    public static boolean deleteAnyone(String FileName) {

        File file = new File(FileName);//根据指定的文件名创建File对象

        if (!file.exists()) {  //要删除的文件不存在
            System.out.println("文件" + FileName + "不存在，删除失败！");
            return false;
        } else { //要删除的文件存在

            if (file.isFile()) { //如果目标文件是文件

                return deleteFile(FileName);

            } else {  //如果目标文件是目录
                return deleteDir(FileName);
            }
        }
    }

    /**
     * 判断指定的文件删除是否成功
     *
     * @param fileName 文件路径
     * @return true or false 成功返回true，失败返回false
     */
    public static boolean deleteFile(String fileName) {


        File file = new File(fileName);//根据指定的文件名创建File对象

        if (file.exists() && file.isFile()) { //要删除的文件存在且是文件

            if (file.delete()) {
                System.out.println("文件" + fileName + "删除成功！");
                return true;
            } else {
                System.out.println("文件" + fileName + "删除失败！");
                return false;
            }
        } else {

            System.out.println("文件" + fileName + "不存在，删除失败！");
            return false;
        }


    }


    /**
     * 删除指定的目录以及目录下的所有子文件
     *
     * @param dirName is 目录路径
     * @return true or false 成功返回true，失败返回false
     */
    public static boolean deleteDir(String dirName) {

        if (dirName.endsWith(File.separator))//dirName不以分隔符结尾则自动添加分隔符
            dirName = dirName + File.separator;

        File file = new File(dirName);//根据指定的文件名创建File对象

        if (!file.exists() || (!file.isDirectory())) { //目录不存在或者
            System.out.println("目录删除失败" + dirName + "目录不存在！");
            return false;
        }

        File[] fileArrays = file.listFiles();//列出源文件下所有文件，包括子目录


        for (int i = 0; i < fileArrays.length; i++) {//将源文件下的所有文件逐个删除

            //Test.deleteAnyone(fileArrays[i].getAbsolutePath());

        }

        if (file.delete())//删除当前目录
            System.out.println("目录" + dirName + "删除成功！");

        return true;

    }

    /**
     * @return byte[]
     * @Author gaoming
     * @Description //TODO 读取流的通用方法
     * @Date 17:02 2020/10/9
     * @Param [inStream]
     **/
    public static byte[] readInputStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[1024];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while ((len = inStream.read(buffer)) != -1) {
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }


    /**
     * 测试
     *
     * @param args
     * @throws
     * @Title: main
     * @author: Gavin
     * @time: 2019年7月2日 下午5:44:08
     * @return: void
     */
    public static void main(String[] args) {
        List<File> files = FileUtil.listFiles("G:/Java基础班视频/Java面向对象类和对象/JavaOp");//扫包
        for (File file : files) {
            System.out.println(file.getAbsolutePath());
        }
//		FileUtil.listFiles(new File("D:/jdk"));
    }

}
