package com.gavin.file.fileUpload;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;

import static com.gavin.file.fileUpload.AjaxResult.Type.ERROR;
import static com.gavin.file.fileUpload.AjaxResult.Type.SUCCESS;

public class FileUpload {
    public static void main(String[] args) {

    }

    //controller中加下面代码
//    @PostMapping("/upload")
//    @ResponseBody
//    public AjaxResult uploadFile(@RequestParam("file") MultipartFile[] files) throws Exception

    public AjaxResult uploadFile(MultipartFile[] files) throws Exception
    {
        MultipartFile file = files[0];
        File file1 = null;
        try
        {
            // 上传文件路径
            String filePath = "trendUrl";//此处的url，服务器的url
            //创建目录
            File pathDir = new File(filePath);
            if(!pathDir.exists()){
                pathDir.mkdirs();
            }
            // 上传并返回新文件名称
            String fileName = file.getOriginalFilename();
            int i=1;
            int index = fileName.indexOf(".");
            while(true){
                file1 = new File(filePath+"/"+fileName);
                if(file1.exists()){

                    String prefixName = fileName.substring(0,index);
                    String additionalName = "("+i+++")";
                    String suffixName = fileName.substring(fileName.indexOf("."));
                    fileName=prefixName+additionalName+suffixName;
                }else{
                    break;
                }
            }
            file1 = new File(filePath+"/"+fileName);
            OutputStream os = new FileOutputStream(file1);
            InputStream is =file.getInputStream();
            byte buf[] = new byte[1024];//可以修改 1024 以提高读取速度
            int length = 0;
            while( (length = is.read(buf)) > 0 ){
                os.write(buf, 0, length);
            }
            //关闭流
            os.flush();
            is.close();
            os.close();
            AjaxResult ajax = AjaxResult.success();
            ajax.put("fileName", fileName);
            return ajax;
        }
        catch (Exception e)
        {
            //logger.error("上传文件失败",e);日志打印
            return AjaxResult.error(e.getMessage());
        }
    }


    /**
     * 本地资源通用下载
     */
    //@GetMapping("/download/resource")
    public void downloadLocal(String resource, HttpServletResponse response) {
        try {
            // 下载本地文件

            resource = URLDecoder.decode(URLDecoder.decode(resource,"UTF-8"),"UTF-8");
            // 读到流中
            InputStream inStream = new FileInputStream("trendUrl"+resource);// 文件的存放路径
            // 设置输出的格式
            response.reset();
            response.setContentType("application/x-msdownload");
//            response.addHeader("Content-Disposition", "attachment; filename=\"" + resource + "\"");
            //解决页面下载附件时,中文不能显示的问题
            response.setHeader("Content-Disposition", "attachment; filename="
                    + new String(resource.getBytes("utf-8"),"ISO-8859-1"));
            // 循环取出流中的数据
            byte[] b = new byte[100];
            int len;
            while ((len = inStream.read(b)) > 0)
                response.getOutputStream().write(b, 0, len);
            inStream.close();
        } catch (IOException e) {
            //logger.error("下载本地文件失败",e);
        }
    }

    /**
     * 本地资源通用删除
     */
    //@ResponseBody
    //@PostMapping("/removeFile")
    public AjaxResult removeFile(String resource) {
        try {
            resource = URLDecoder.decode(URLDecoder.decode(resource,"UTF-8"),"UTF-8");
            String path = "trendUrl"+resource;
            File file = new File(path);
            if (!file.exists()) {  // 不存在返回 false
                return new AjaxResult(ERROR,"删除文件失败，未找到文件");
            } else {
                // 判断是否为文件
                if (file.isFile()) {  // 为文件时调用删除文件方法
                    file.delete();
                }
            }
        } catch (Exception e) {
            //logger.error("删除文件失败",e);
            return new AjaxResult(ERROR,"删除文件失败，程序出现异常");
        }
        return new AjaxResult(SUCCESS,"删除文件成功");
    }

}
