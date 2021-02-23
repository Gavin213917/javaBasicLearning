package com.gavin.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.ResourceUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * Excel表格操作共通类
 */
public class POIExcelUtil {
	
	
	
	/**
	 * excel 文件生成
	 * @param templateFileName excel模板名称
	 * @param expfileName excel导出文件名称
	 * @param tableTitle  文件表头
	 * @param startRow  数据开始写入行数
	 * @param columnArrays 数据写入列字段影响（顺序决定excel 中的顺序）
	 * @param jsonAray 需要写入的数据
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static void exportFile(HttpServletResponse response, HttpServletRequest request,String templateFileName,String expfileName,String tableTitle,int startRow,String[] columnArrays,JSONArray jsonAray) throws FileNotFoundException, IOException {
		File file = ResourceUtils.getFile("classpath:templates"+File.separator+"excelTemplates"+File.separator+templateFileName);
		XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(file));
		XSSFSheet hssfSheet = wb.getSheetAt(0);
		if(tableTitle.equals("notitle")) {
			
		}else {
			hssfSheet.getRow(0).getCell(0).setCellValue(tableTitle);
		}
		
		System.out.println(hssfSheet.getLastRowNum());
		
		// 设置细边框
		CellStyle cellStyle= wb.createCellStyle();
//		cellStyle.setBorderRight(BorderStyle.THIN);
//		cellStyle.setBorderBottom(BorderStyle.THIN);
//		cellStyle.setBorderLeft(BorderStyle.THIN);
//		cellStyle.setBorderTop(BorderStyle.THIN);
		
		
		//开始写数据的行
		int rowIndex = startRow-1;
		XSSFRow row = null;
		XSSFCell cell = null;

		
		
		if (jsonAray != null && jsonAray.size()>0) {
//			签名备注复制
			copyRows(hssfSheet, rowIndex, hssfSheet.getLastRowNum(), rowIndex+jsonAray.size());
			// 获取所有的记录 有多少条记录就创建多少行
			for (int i = 0; i < jsonAray.size(); i++) {
				row = hssfSheet.createRow(rowIndex);
				JSONObject jsonObj = jsonAray.getJSONObject(i);
				//下一行索引
				rowIndex++;
				// 在有所有的记录基础之上，便利传入进来的表头,再创建N行
				for(int j=0 ;j<columnArrays.length;j++){
					cell = row.createCell(j);
					cell.setCellStyle(cellStyle);
					//按照每条记录匹配数据
					cell.setCellValue(jsonObj.getString(columnArrays[j]) == null ? "" : jsonObj.getString(columnArrays[j]).toString());
					if(columnArrays[j].equals("rownum_")){
						cell.setCellValue(""+((int)Double.parseDouble(jsonObj.getString(columnArrays[j]))));
					}
				}
			} 
		}
		try {
			response.reset();
			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
	        response.setContentType("application/force-download;charset=UTF-8");// 设置强制下载不打开
	        response.addHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(expfileName, "UTF-8") + ".xlsx");
			OutputStream outputStream = response.getOutputStream();
			wb.write(outputStream);
			outputStream.flush();
			outputStream.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * excel 文件生成
	 * @param templateFileName excel模板名称
	 * @param expfileName excel导出文件名称
	 * @param tableTitle  文件表头
	 * @param startRow  数据开始写入行数
	 * @param columnArrays 数据写入列字段影响（顺序决定excel 中的顺序）
	 * @param jsonAray 需要写入的数据
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static void exportFileNoCopy(HttpServletResponse response, HttpServletRequest request,String templateFileName,String expfileName,String tableTitle,int startRow,String[] columnArrays,JSONArray jsonAray) throws FileNotFoundException, IOException {
		File file = ResourceUtils.getFile("classpath:templates"+File.separator+"excelTemplates"+File.separator+templateFileName);
		XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(file));
		XSSFSheet hssfSheet = wb.getSheetAt(0);
		if(tableTitle.equals("notitle")) {
			
		}else {
			hssfSheet.getRow(0).getCell(0).setCellValue(tableTitle);
		}
		
		System.out.println(hssfSheet.getLastRowNum());
		
		// 设置细边框
		CellStyle cellStyle= wb.createCellStyle();
//		cellStyle.setBorderRight(BorderStyle.THIN);
//		cellStyle.setBorderBottom(BorderStyle.THIN);
//		cellStyle.setBorderLeft(BorderStyle.THIN);
//		cellStyle.setBorderTop(BorderStyle.THIN);
		
		
		//开始写数据的行
		int rowIndex = startRow-1;
		XSSFRow row = null;
		XSSFCell cell = null;

		
		
		if (jsonAray != null && jsonAray.size()>0) {
			// 获取所有的记录 有多少条记录就创建多少行
			for (int i = 0; i < jsonAray.size(); i++) {
				row = hssfSheet.createRow(rowIndex);
				JSONObject jsonObj = jsonAray.getJSONObject(i);
				//下一行索引
				rowIndex++;
				// 在有所有的记录基础之上，便利传入进来的表头,再创建N行
				for(int j=0 ;j<columnArrays.length;j++){
					cell = row.createCell(j);
					cell.setCellStyle(cellStyle);
					//按照每条记录匹配数据
					cell.setCellValue(jsonObj.getString(columnArrays[j]) == null ? "" : jsonObj.getString(columnArrays[j]).toString());
					if(columnArrays[j].equals("rownum_")){
						String cellvalue=(int)Double.parseDouble(jsonObj.getString(columnArrays[j]))+""==""?"0":(int)Double.parseDouble(jsonObj.getString(columnArrays[j]))+"";
						cell.setCellValue(cellvalue);
					}
				}
			} 
		}
		try {
			response.reset();
			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
	        response.setContentType("application/force-download;charset=UTF-8");// 设置强制下载不打开
	        response.addHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(expfileName, "UTF-8") + ".xlsx");
			OutputStream outputStream = response.getOutputStream();
			wb.write(outputStream);
			outputStream.flush();
			outputStream.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	

    /**
     * 复制一行到指定的位置 workbook：当前Excel文档，worksheet：当前sheet页，sourceRowNum：原始行数，
     * destinationRowNum：目标行数
     */
    public static void insertRow(Workbook workbook, Sheet worksheet, int sourceRowNum, int destinationRowNum) {

        worksheet.shiftRows(destinationRowNum, worksheet.getLastRowNum(), 1); // 在目标行插入一个空白行

        // 创建目标行对象，获得原始行对象
        Row newRow = worksheet.createRow(destinationRowNum);
        Row sourceRow = worksheet.getRow(sourceRowNum);

        // 循环遍历原始行的列添加到目标行对应的列中
        for (int i = 0; i < sourceRow.getLastCellNum(); i++) {
            Cell oldCell = sourceRow.getCell(i);
            Cell newCell = newRow.createCell(i);

            // 如果原始行单元格为空，跳过
            if (oldCell == null) {
                newCell = null;
                continue;
            }

            // 复制原始单元格的格式并应用到新单元格
            CellStyle newCellStyle = workbook.createCellStyle();
            newCellStyle.cloneStyleFrom(oldCell.getCellStyle());
            newCell.setCellStyle(newCellStyle);

            // 如果单元格有注释
            if (newCell.getCellComment() != null) {
                newCell.setCellComment(oldCell.getCellComment());
            }

            // 如果单元格有超链接
            if (oldCell.getHyperlink() != null) {
                newCell.setHyperlink(oldCell.getHyperlink());
            }

            // 设置单元格数据类型
            newCell.setCellType(oldCell.getCellType());

            // 设置单元格值
            newCell.setCellValue(oldCell.getRichStringCellValue());
        }

        // 如果原始行中有单元格合并，将其复制到目标行中
        for (int i = 0; i < worksheet.getNumMergedRegions(); i++) {
            CellRangeAddress cellRangeAddress = worksheet.getMergedRegion(i);
            // 如果表中第i个合并单元格在原始行中
            if (cellRangeAddress.getFirstRow() == sourceRow.getRowNum()) {
                CellRangeAddress newCellRangeAddress = new CellRangeAddress(newRow.getRowNum(), // 合并单元格起始行
                        (newRow.getRowNum() + (cellRangeAddress.getLastRow() - cellRangeAddress.getFirstRow() // 合并单元格结束行
                        )), cellRangeAddress.getFirstColumn(), // 合并单元格起始列
                        cellRangeAddress.getLastColumn()); // 合并单元格结束列
                worksheet.addMergedRegion(newCellRangeAddress);
            }
        }
    }

    /**
     * 复制行
     * 
     * @param startRow
     *            起始行
     * @param endRow
     *            结束行
     * @param pPosition
     *            目标起始行位置
     */
    public static void copyRows(Sheet currentSheet, int startRow, int endRow, int pPosition) {
        int pStartRow = startRow;
        int pEndRow = endRow;
        int targetRowFrom;
        int targetRowTo;
        int columnCount;
        CellRangeAddress region = null;
        int i;
        int j;
        if (pStartRow < 0 || pEndRow < 0) {
            return;
        }
        for (i = 0; i < currentSheet.getNumMergedRegions(); i++) {
            region = currentSheet.getMergedRegion(i);
            if ((region.getFirstRow() >= pStartRow) && (region.getLastRow() <= pEndRow)) {
                targetRowFrom = region.getFirstRow() - pStartRow + pPosition;
                targetRowTo = region.getLastRow() - pStartRow + pPosition;
                CellRangeAddress newRegion = region.copy();
                newRegion.setFirstRow(targetRowFrom);
                newRegion.setFirstColumn(region.getFirstColumn());
                newRegion.setLastRow(targetRowTo);
                newRegion.setLastColumn(region.getLastColumn());
                currentSheet.addMergedRegion(newRegion);
            }
        }
        for (i = pStartRow; i <= pEndRow; i++) {
            Row sourceRow = currentSheet.getRow(i);
            if (sourceRow != null) {
            	columnCount = sourceRow.getLastCellNum();
                Row newRow = currentSheet.createRow(pPosition - pStartRow + i);
                newRow.setHeight(sourceRow.getHeight());
                for (j = 0; j < columnCount; j++) {
                    Cell templateCell = sourceRow.getCell(j);
                    if (templateCell != null) {
                        Cell newCell = newRow.createCell(j);
                        copyCell(templateCell, newCell);
                    }
                }
            }
        }
        //删除原来注释位置内容
        int remove_i=endRow>pPosition?endRow:pPosition;
        for(int i1=startRow;i1<=remove_i;i1++){
        	if(currentSheet.getRow(i1)!=null){
        		currentSheet.removeRow(currentSheet.getRow(i1));
        	}
        }
        
    }

    public static void copyCell(Cell srcCell, Cell distCell) {
        distCell.setCellStyle(srcCell.getCellStyle());
        if (srcCell.getCellComment() != null) {
            distCell.setCellComment(srcCell.getCellComment());
        }
        int srcCellType = srcCell.getCellType();
        distCell.setCellType(srcCellType);
        if (srcCellType == Cell.CELL_TYPE_NUMERIC) {
            if (DateUtil.isCellDateFormatted(srcCell)) {
                distCell.setCellValue(srcCell.getDateCellValue());
            } else {
                distCell.setCellValue(srcCell.getNumericCellValue());
            }
        } else if (srcCellType == Cell.CELL_TYPE_STRING) {
            distCell.setCellValue(srcCell.getRichStringCellValue());
        } else if (srcCellType == Cell.CELL_TYPE_BLANK) {
            // nothing21
        } else if (srcCellType == Cell.CELL_TYPE_BOOLEAN) {
            distCell.setCellValue(srcCell.getBooleanCellValue());
        } else if (srcCellType == Cell.CELL_TYPE_ERROR) {
            distCell.setCellErrorValue(srcCell.getErrorCellValue());
        } else if (srcCellType == Cell.CELL_TYPE_FORMULA) {
            distCell.setCellFormula(srcCell.getCellFormula());
        } else { // nothing29

        }
    }



	public static void exportFile(HttpServletResponse response, HttpServletRequest request,String templateFileName,String expfileName,String tableTitle,int startRow,String[] columnArrays,JSONArray jsonAray, int titlerow, int titlecol) throws FileNotFoundException, IOException {
		// TODO Auto-generated method stub
		File file = ResourceUtils.getFile("classpath:templates"+File.separator+"excelTemplates"+File.separator+templateFileName);
		XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(file));
		XSSFSheet hssfSheet = wb.getSheetAt(0);
		if(tableTitle.equals("notitle")) {
			
		}else {
			hssfSheet.getRow(titlerow).getCell(titlecol).setCellValue(tableTitle);
		}
		
		System.out.println(hssfSheet.getLastRowNum());
		
		// 设置细边框
		CellStyle cellStyle= wb.createCellStyle();
//		cellStyle.setBorderRight(BorderStyle.THIN);
//		cellStyle.setBorderBottom(BorderStyle.THIN);
//		cellStyle.setBorderLeft(BorderStyle.THIN);
//		cellStyle.setBorderTop(BorderStyle.THIN);
		
		
		//开始写数据的行
		int rowIndex = startRow-1;
		XSSFRow row = null;
		XSSFCell cell = null;

		
		
		if (jsonAray != null && jsonAray.size()>0) {
//			签名备注复制
			copyRows(hssfSheet, rowIndex, hssfSheet.getLastRowNum(), rowIndex+jsonAray.size());
			// 获取所有的记录 有多少条记录就创建多少行
			for (int i = 0; i < jsonAray.size(); i++) {
				row = hssfSheet.createRow(rowIndex);
				JSONObject jsonObj = jsonAray.getJSONObject(i);
				//下一行索引
				rowIndex++;
				// 在有所有的记录基础之上，便利传入进来的表头,再创建N行
				for(int j=0 ;j<columnArrays.length;j++){
					cell = row.createCell(j);
					cell.setCellStyle(cellStyle);
					//按照每条记录匹配数据
					cell.setCellValue(jsonObj.getString(columnArrays[j]) == null ? "" : jsonObj.getString(columnArrays[j]).toString());
					if(columnArrays[j].equals("rownum_")){
						cell.setCellValue(""+((int)Double.parseDouble(jsonObj.getString(columnArrays[j]))));
					}
				}
			}
		}
		try {
			response.reset();
			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
	        response.setContentType("application/force-download;charset=UTF-8");// 设置强制下载不打开
	        response.addHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(expfileName, "UTF-8") + ".xlsx");
			OutputStream outputStream = response.getOutputStream();
			wb.write(outputStream);
			outputStream.flush();
			outputStream.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
