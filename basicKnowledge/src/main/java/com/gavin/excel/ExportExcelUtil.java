package com.gavin.excel;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

/**
 * Excel导出工具类
 */
public class ExportExcelUtil {
    /**
     * 工作薄
     */
    private Workbook wb = null;

    /**
     * 工作表
     */
    private Sheet sheet = null;

    /**
     * 单元格自动换行标识
     */
    private Boolean cellWrapFlag = null;

    public static final String EXTENSION_XLSX = ".xlsx";

    /**
     * 构造函数
     *
     * @throws IOException
     */
    public ExportExcelUtil(String filePath) throws IOException {
        wb = new XSSFWorkbook(new FileInputStream(new File(filePath)));
        sheet = wb.getSheetAt(0);
    }

    public ExportExcelUtil(InputStream inputStream) throws IOException {
        wb = new XSSFWorkbook(inputStream);
        sheet = wb.getSheetAt(0);
    }

    /**
     * 构造函数
     *
     * @throws IOException
     */
    public ExportExcelUtil() throws IOException {
        wb = new XSSFWorkbook();
    }

    public Boolean getCellWrapFlag() {
        return cellWrapFlag;
    }

    /**
     * 如果需要进行换行处理，可以在调用cteateTableByList进行单元格数据生成之前调用该方法进行处理
     *
     * @param cellWrapFlag
     */
    public void setCellWrapFlag(Boolean cellWrapFlag) {
        this.cellWrapFlag = cellWrapFlag;
    }

    /**
     * 构造函数
     *
     * @param wb
     * @param sheet
     */
    public ExportExcelUtil(XSSFWorkbook wb, Sheet sheet) {
        super();
        this.wb = wb;
        this.sheet = sheet;
    }

    /**
     * @return the sheet
     */
    public Sheet getSheet() {
        return sheet;
    }

    /**
     * 根据序号设置当前操作的sheet
     *
     * @param index
     */
    public void setSheetByIndex(int index) {
        if (sheet != null) {
            sheet = wb.getSheetAt(index);
        }
    }

    /**
     * @param sheet the sheet to set
     */
    public void setSheet(HSSFSheet sheet) {
        this.sheet = sheet;
    }

    /**
     * @return the wb
     */
    public Workbook getWb() {
        return wb;
    }

    /**
     * @param wb the wb to set
     */
    public void setWb(Workbook wb) {
        this.wb = wb;
    }


    /**
     * 根据java反射机制，取list中对象属性 创建内容单元格
     *
     * @param objectList list 集合
     * @param fields     fields 该list中 要导出的某些属性 String[] str = {"Cl0","name","code"};
     * @param fromRow    从第几行开始 -默认为0 从第一行开始,可选填
     *                   <p>
     *                   效果：通过list 显示整行整列的列表（无合并列、无合并行），可导出到Excel
     */
    @SuppressWarnings("unchecked")
    public void createTableByList(List objectList, String[] fields, int fromRow) throws Exception {
        // 从fromRow行开始
        int r = fromRow;
        // 设置样式属性
        CellStyle style = wb.createCellStyle();
        // 下边框
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 左边框
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 上边框
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 右边框
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        Row initRow = sheet.getRow(r);
        for (Object obj : objectList) {
            Class<?> classType = obj.getClass();
            Row row = null;
            if (r == fromRow && initRow != null) {
                row = initRow;// 设置行
            } else {
                row = sheet.createRow(r);// 设置行
            }

            for (int j = 0; j < fields.length; j++) {
                // 将属性首字母装换成大写
                String firstLetter = fields[j].substring(0, 1).toUpperCase();
                String getMethodName = "get" + firstLetter + fields[j].substring(1);
                Method getMethod = classType.getMethod(getMethodName, new Class[]{});
                // 获得对象的属性
                Object value = getMethod.invoke(obj, new Object[]{});
                Cell cell = null;
                if (initRow != null) {
                    if (r == fromRow) {
                        cell = row.getCell(j);
                    } else {
                        // 创建单元格
                        cell = row.createCell(j);
                    }
                    cell.setCellStyle(initRow.getCell(j).getCellStyle());
                    if (value instanceof Integer){
                        cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
                    }

                } else {
                    // 创建单元格
                    cell = row.createCell(j);
                    // 中文处理
                    cell.setCellType(HSSFCell.ENCODING_UTF_16);
                    cell.setCellStyle(style);
                }
                //单元格自动换行设置
                if (cellWrapFlag != null) {
                    cell.getCellStyle().setWrapText(cellWrapFlag);
                }
                if (value instanceof Integer){
                    cell.setCellValue(value == null ? 0 : ((Integer) value).intValue());
                }else{
                    cell.setCellValue(new XSSFRichTextString(value == null ? "" : value.toString()));
                }
            }
            r = r + 1;
        }
    }

    /**
     * 对特定单元格赋值
     *
     * @param rowIndex
     * @param colIndex
     * @param value
     */
    public void setCellValue(int rowIndex, int colIndex, String value) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) {
            row = sheet.createRow(rowIndex);
        }

        Cell cell = row.getCell(colIndex);
        if (cell == null) {
            cell = row.createCell(colIndex);
        }
        cell.setCellValue(new XSSFRichTextString(value));
    }

    /**
     * 输入EXCEL文件
     *
     * @param fileName 文件名
     * @author wdh
     */
    public void outputExcel(String fileName, HttpServletRequest request, HttpServletResponse response) {
        //String FileName =  fileName+ new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());//不重复文件名
        try (ServletOutputStream os = response.getOutputStream()) {
            response.setContentType("application/vnd.ms-excel");
            String filename = new String(fileName.getBytes("gbk"), "iso8859-1") + EXTENSION_XLSX;
            response.setHeader("Content-disposition", "attachment; filename=" + filename);
            wb.write(os);
            os.flush();
        } catch (IOException e) {
            //log.error("", e);
        } catch (Exception e) {
            //log.error("", e);
        }
    }


    /**
     * 合并单元格
     *
     * @param firstRow 起始行号
     * @param lastRow  终止行号
     * @param firstCol 起始列号
     * @param lastCol  终止列号
     */
    public void mergedCells(int firstRow, int lastRow, int firstCol, int lastCol) {
        sheet.addMergedRegion(new CellRangeAddress(firstRow, lastRow, firstCol, lastCol));
    }

    /**
     * 取(List<Map<String,String>>中的数据创建内容单元格，解决动态列的问题
     * 可以同时合并列头，设置列宽
     *
     * @param objectList   需要导出的数据List<Map<String,String>>
     * @param title        标题
     * @param headers      列头String[][]，支持列头合并
     * @param headerHights 列头行高度int[]，
     * @param regionList   列头合并块 List<Map<String,String>>
     * @param colwidths    列宽int[]
     * @param fields       取数据使用的KeyString[]
     * @throws Exception
     */
    public void createExcelByListMap(List<Map<String, String>> objectList, String title, String[][] headers, int[] headerHights, List<Map<String, String>> regionList, int[] colwidths, String[] fields) throws Exception {
        // 从fromRow行开始
        int r = 0;
        sheet = wb.createSheet(title);
        // 设置样式属性
        CellStyle styleTitle = wb.createCellStyle();
        // 下边框
        styleTitle.setBorderBottom(HSSFCellStyle.BORDER_NONE);
        // 左边框
        styleTitle.setBorderLeft(HSSFCellStyle.BORDER_NONE);
        // 上边框
        styleTitle.setBorderTop(HSSFCellStyle.BORDER_NONE);
        // 右边框
        styleTitle.setBorderRight(HSSFCellStyle.BORDER_NONE);
        // 居中
        styleTitle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTitle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        Font font = wb.createFont();
        // HSSFColor.VIOLET.index //字体颜色
        font.setColor(HSSFColor.BLACK.index);
        font.setFontHeightInPoints((short) 15);
        // 字体增粗
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        styleTitle.setFont(font);
        // 设置样式属性
        CellStyle styleHeader = wb.createCellStyle();
        // 下边框
        styleHeader.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 左边框
        styleHeader.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 上边框
        styleHeader.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 右边框
        styleHeader.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 居中
        styleHeader.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleHeader.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        //styleHeader.setFillForegroundColor(HSSFColor.ORANGE.index);
        //styleHeader.setFillBackgroundColor(HSSFColor.ORANGE.index);
        //styleHeader.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        Font fontHeader = wb.createFont();
        // HSSFColor.VIOLET.index //字体颜色
        fontHeader.setColor(HSSFColor.BLACK.index);
        fontHeader.setFontHeightInPoints((short) 10);
        // 字体增粗
        fontHeader.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        styleHeader.setFont(fontHeader);

        // 设置样式属性
        CellStyle style = wb.createCellStyle();
        // 下边框
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 左边框
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 上边框
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 右边框
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        Font fontCell = wb.createFont();
        fontCell.setFontHeightInPoints((short) 10);
        style.setFont(fontCell);

        //单元格自动换行设置
        if (cellWrapFlag != null) {
            styleTitle.setWrapText(cellWrapFlag);
            styleHeader.setWrapText(cellWrapFlag);
            style.setWrapText(cellWrapFlag);
        }


        //生成标题
        Row rowTitle = sheet.createRow(r);
        rowTitle.setHeight((short) 600);
        for (int i = 0; i < fields.length; i++) {
            rowTitle.createCell(i);
            rowTitle.getCell(i).setCellStyle(styleTitle);
            sheet.setColumnWidth(i, colwidths[i] * 256);
        }
        r = r + 1;

        rowTitle.getCell(0).setCellValue(new XSSFRichTextString(title));
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, (fields.length - 1)));
        //生成列头
        if (headers != null && headers.length > 0) {
            for (int i = 0; i < headers.length; i++) {
                Row rowHeader = sheet.createRow(r);
                if (headerHights != null && headerHights.length == headers.length && headerHights[i] > 0) {
                    rowHeader.setHeight((short) headerHights[i]);
                } else {
                    rowHeader.setHeight((short) 350);
                }

                String[] header = headers[i];
                for (int j = 0; j < header.length; j++) {
                    rowHeader.createCell(j);
                    rowHeader.getCell(j).setCellStyle(styleHeader);
                    rowHeader.getCell(j).setCellValue(new XSSFRichTextString(header[j]));
                }
                r = r + 1;
            }
        }

        //合并单元格
        String rowFrom = "";
        String rowTo = "";
        String colFrom = "";
        String colTo = "";
        if (regionList != null && regionList.size() > 0) {
            for (int i = 0; i < regionList.size(); i++) {
                Map map = regionList.get(i);
                rowFrom = map.get("rowFrom").toString();
                rowTo = map.get("rowTo").toString();
                colFrom = map.get("colFrom").toString();
                colTo = map.get("colTo").toString();
                sheet.addMergedRegion(new CellRangeAddress(Integer.parseInt(rowFrom), Integer.parseInt(rowTo), Integer.parseInt(colFrom), Integer.parseInt(colTo)));
            }

        }
        //生成数据
        Row initRow = sheet.getRow(r);
        for (Map<String, String> obj : objectList) {
            Row row = null;
            // 设置行
            row = sheet.createRow(r);
            for (int j = 0; j < fields.length; j++) {
                Object value = obj.get(fields[j]);
                Cell cell = null;
                // 创建单元格
                cell = row.createCell(j);
                // 中文处理
                cell.setCellType(HSSFCell.ENCODING_UTF_16);
                cell.setCellStyle(style);
                cell.setCellValue(new XSSFRichTextString(value == null ? "" : value.toString()));
            }
            r = r + 1;
        }

    }


    /**
     * 根据java反射机制，取list中对象属性 创建内容单元格
     *
     * @param objectList list 集合
     * @param fields     fields 该list中 要导出的某些属性 String[] str = {"Cl0","name","code"};
     * @param fromRow    从第几行开始 -默认为0 从第一行开始,可选填
     *                   <p>
     *                   效果：通过list 显示整行整列的列表（无合并列、无合并行），可导出到Excel
     * @param rowIndex   支持行添加
     */
    public void createTableByListRow(List objectList, String[] fields, int fromRow, int rowIndex) throws Exception {
        // 从fromRow行开始
        int r = fromRow;
        // 设置样式属性
        CellStyle style = wb.createCellStyle();
        // 下边框
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 左边框
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 上边框
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 右边框*/
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        Row initRow = sheet.getRow(r);
        for (Object obj : objectList) {
            Class<?> classType = obj.getClass();
            Row row = null;
            if (r == fromRow && initRow != null) {
                // 设置行
                row = initRow;
            } else {
                // 设置行
                row = sheet.createRow(r);
            }

            for (int j = 0; j < fields.length; j++) {
                Cell cell = null;
                if (initRow != null) {
                    if (r == fromRow) {
                        cell = row.getCell(j);
                    } else {
                        // 创建单元格
                        cell = row.createCell(j);
                    }
                    cell.setCellStyle(initRow.getCell(j).getCellStyle());
                } else {
                    // 创建单元格
                    cell = row.createCell(j);
                    // 中文处理
                    cell.setCellType(HSSFCell.ENCODING_UTF_16);
                    cell.setCellStyle(style);
                }

                if (fields[j] == null) {
                    continue;
                }

                Object value = "";
                // 简单判断，懒得写了
                if (fields[j].length() == 1 || fields[j].length() == 2) {
                    value = fields[j];
                } else {
                    // 将属性首字母装换成大写
                    String firstLetter = fields[j].substring(0, 1).toUpperCase();
                    String getMethodName = "get" + firstLetter + fields[j].substring(1);
                    Method getMethod = classType.getMethod(getMethodName, new Class[]{});
                    // 获得对象的属性
                    value = getMethod.invoke(obj, new Object[]{});
                }


                //单元格自动换行设置
                if (cellWrapFlag != null) {
                    cell.getCellStyle().setWrapText(cellWrapFlag);
                }
                cell.setCellValue(new XSSFRichTextString(value == null ? "" : value.toString()));
            }
            r = r + rowIndex;
        }
    }


    /**
     * 从 dataList 集合中获取 数据 写入 单元格值
     *
     * @param fromRow 从第几行开始 -默认为0 从第一行开始,可选填
     * @param fromCol 从第几列开始 -默认为0 从第一列开始,可选填
     *                <p>
     *                效果：通过list 显示整行整列的列表（无合并列、无合并行），可导出到Excel
     */
    public void cteateTableByListData(List<List<String>> dataList, int fromRow, int fromCol, int colspan, String sheetName) {
        // 从fromRow行开始
        int r = fromRow;
        // 从fromCol列开始
        int c = fromCol;
        // 设置样式属性
        CellStyle style = wb.createCellStyle();
        // 下边框
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 左边框
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 上边框
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 右边框
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

        if (StringUtils.isNotBlank(sheetName)) {
            wb.setSheetName(0, sheetName);
        }

        int lastNum = sheet.getLastRowNum();
        if (fromRow < lastNum) {
            sheet.shiftRows(fromRow, lastNum, dataList.size(), true, true);
        }


        for (int index = 0; index < dataList.size(); index++) {
            Row row = sheet.getRow(r + index);
            if (row == null) {
                row = sheet.createRow(r + index);
            }

            List<String> dtlist = dataList.get(index);

            for (int j = 0; j < colspan; j++) {
                // 创建单元格;
                Cell cell = row.createCell(c + j);
                // 中文处理
                cell.setCellType(HSSFCell.ENCODING_UTF_16);
                cell.setCellStyle(style);
                //单元格自动换行设置
                if (cellWrapFlag != null) {
                    cell.getCellStyle().setWrapText(cellWrapFlag);
                }

                if (j < dtlist.size()) {
                    //获得一个单元格的值
                    String dt = dtlist.get(j);
                    cell.setCellValue(new XSSFRichTextString(dt));
                }

            }
        }
    }

    /**
     * 多个 合并单元格
     *
     * @param firstRow
     * @param rowsapn
     * @param firstCol
     * @param colspan
     * @param totalNum
     */
    public void addMergedCols(int firstRow, int rowsapn, int firstCol, int colspan, int totalNum) {
        int lastRow = firstRow + rowsapn - 1;
        int lastCol = firstCol + colspan - 1;

        for (int i = 0; i < totalNum; i++) {
            mergedCells(firstRow, lastRow, firstCol, lastCol);
            firstRow = lastRow + 1;
            lastRow = lastRow + rowsapn;

        }


    }


}
