package com.gavin.excel;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddress;

public class Client {
    /**
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        Client c = new Client();
        List list1 = new ArrayList();
        List list2 = new ArrayList();
        List list3 = new ArrayList();
        
        List list = new ArrayList();
        list1.add("1班");
        list1.add("zhangsan");
        list1.add("10");
        list1.add("男");
        
        list2.add("");
        list2.add("lisi");
        list2.add("90");
        list2.add("男");
        
        list3.add("");
        list3.add("wangwu");
        list3.add("100");
        list3.add("女");
        
        list.add(list1);
        list.add(list2);
        list.add(list3);
        
        List et = new ArrayList();
        et.add("区域");
        et.add("姓名");
        et.add("年纪");
        et.add("性别");
        
        HSSFWorkbook excle = c.getExcel(et,list);
         OutputStream out = new FileOutputStream("E://a.xls");
         excle.write(out);
    }

    // 创建一个excel文件
    public HSSFWorkbook getExcel(List excleTitle, List<List> data) {
        // 创建工作簿实例
        HSSFWorkbook workbook = new HSSFWorkbook();

        // 创建一个sheet
        HSSFSheet sheet = workbook.createSheet("TscExcel");

        // 设置表明名名称 第一行为表名
        HSSFRow excelName = sheet.createRow(0);
        // 创建列第一行第一列
        HSSFCell cell = excelName.createCell(0);
        cell.setCellValue("学生信息");
        // 表头需要合并
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));

        // 设置表明名名称 第一行为标题
        HSSFRow row = sheet.createRow(1);// 建立新行
        for (int i = 0; i < excleTitle.size(); i++) {
            HSSFCell cellf = row.createCell((short) i);
            cellf.setCellValue((String) excleTitle.get(i));
        }

        // 2. 给excel填充数据
        int i = 0;
        for (List<List> tableBody : data) {
            HSSFRow rowBody = sheet.createRow(i + 2);// 建立新行
            for (int j = 0; j < tableBody.size(); j++) {
                this.createCell(rowBody, j, tableBody.get(j));
            }
            i++;
        }
        sheet.addMergedRegion(new CellRangeAddress(2, data.size()+1, 0, 0));

        return workbook;
    }

    /**
     * 创建Excel单元格及默认格式
     */
    private  void createCell(HSSFRow row, int column, Object value) {
        HSSFCell cell = row.createCell((short) column);
        String data = "";
        if (value != null)
            data += value;
        if (!"".equals(data) && isNumeric(data) && data.indexOf("0") != 0) {
            // 电话号码以86开头加上去就是13位的数字或者纯的数字但是大于等于11,只能设置为文本形式,不然在设置成数字类型在excel单元格中就看上去就像乱码了
            if ((data.indexOf("86") == 0 && data.length() == 13)
                    || data.length() >= 11) {
                cell.setCellValue(data);
            } else {
                cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
                cell.setCellValue(Double.parseDouble(data.trim()));
            }
        } else {
            cell.setCellValue(data);
        }

    }
    /**
     * 判断是否为数字
     *
     * @param str
     * @return
     */
    public static boolean isNumeric(String str) {
        for (int i = str.length(); --i >= 0;) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

}
