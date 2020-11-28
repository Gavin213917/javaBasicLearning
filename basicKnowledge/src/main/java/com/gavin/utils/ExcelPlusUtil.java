package com.gavin.utils;

//import com.wondersgroup.model.ExcelData;
//import com.wondersgroup.model.ExcelRowData;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

//public class ExcelPlusUtil {
//	public static void exportExcel(HttpServletResponse response, String fileName, ExcelData data) throws Exception {
//		// 告诉浏览器用什么软件可以打开此文件
//		//response.setHeader("content-Type", "application/vnd.ms-excel");
//		// 下载文件的默认名称
//		response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
//		exportExcel(data, response.getOutputStream());
//	}
//
//	public static void exportExcel(ExcelData data, OutputStream out) throws Exception {
//		HSSFWorkbook wb = new HSSFWorkbook();
////		HSSFCellStyle style = workbook.createCellStyle();
////		style.setAlignment(VerticalAlignment);
////		style.setVerticalAlignment("CENTER");
////		WritableWorkbook wb = null;
//		try {
////			wb = Workbook.createWorkbook(out);
//			String sheetName = data.getName();
//			if (null == sheetName) {
//				sheetName = "Sheet1";
//			}
//			HSSFSheet sheet = wb.createSheet(sheetName);
//			HSSFCellStyle cellStyle = wb.createCellStyle();
//			cellStyle.setAlignment(HorizontalAlignment.CENTER);
//			cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
//			//设置自动换行
//			cellStyle.setWrapText(true);
//			writeExcel(sheet, data,cellStyle);
//			wb.write(out);
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			wb.close();
//			out.close();
//		}
//	}
//
//	private static void writeExcel(HSSFSheet sheet, ExcelData data,HSSFCellStyle cellStyle) throws Exception {
//		List<String> titles = data.getTitles();
//		List<ExcelRowData> rowDataList = data.getComplexRows();
//		int rowIndex = 0;
//		for(ExcelRowData rowData:rowDataList){
//			HSSFRow row = sheet.createRow(rowIndex);
//
//
//			String[] values = rowData.getValues();
//			String[] cellAreas = rowData.getCellAreas();
//
//			for(int i=0;i<values.length;i++){
//				String cellArea = cellAreas[i];
//				String[] areas = cellArea.split(",");
//				//合并日期占两行(4个参数，分别为起始行，结束行，起始列，结束列)
//				int startCol = Integer.parseInt(areas[2]);
//				String value = values[i];
//				HSSFCell cell = row.createCell(startCol);
//				cell.setCellStyle(cellStyle);
//				cell.setCellValue(value);
//			}
//			for(int i=0;i<cellAreas.length;i++){
//				String cellArea = cellAreas[i];
//				String[] areas = cellArea.split(",");
//				//合并日期占两行(4个参数，分别为起始行，结束行，起始列，结束列)
//				int beginRow = Integer.parseInt(areas[0]);
//				int endRow = Integer.parseInt(areas[1]);
//				int startCol = Integer.parseInt(areas[2]);
//				int endCol = Integer.parseInt(areas[3]);
//				if(beginRow!=endRow || startCol!=endCol){
//					CellRangeAddress region = new CellRangeAddress(beginRow, endRow, startCol, endCol);
//					sheet.addMergedRegion(region);
//				}
//			}
//			rowIndex++;
//		}
//	}
//
//}
