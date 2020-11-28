//package com.gavin.utils;
//
//import java.io.OutputStream;
//import java.net.URLEncoder;
//import java.util.List;
//
//import javax.servlet.http.HttpServletResponse;
//
//import com.wondersgroup.model.ExcelData;
//
//import jxl.Workbook;
//import jxl.write.Label;
//import jxl.write.WritableSheet;
//import jxl.write.WritableWorkbook;
//
//public class ExcelUtil {
//	public static void exportExcel(HttpServletResponse response, String fileName, ExcelData data) throws Exception {
//		// 告诉浏览器用什么软件可以打开此文件
//		//response.setHeader("content-Type", "application/vnd.ms-excel");
//		// 下载文件的默认名称
//		response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
//		exportExcel(data, response.getOutputStream());
//	}
//
//	public static void exportExcel(ExcelData data, OutputStream out) throws Exception {
//		WritableWorkbook wb = null;
//		try {
//			wb = Workbook.createWorkbook(out);
//			String sheetName = data.getName();
//			if (null == sheetName) {
//				sheetName = "Sheet1";
//			}
//			WritableSheet sheet = wb.createSheet(sheetName, 0);
//			writeExcel(sheet, data);
//			wb.write();
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			wb.close();
//			out.close();
//		}
//	}
//
//	private static void writeExcel(WritableSheet sheet, ExcelData data) throws Exception {
//		List<String> titles = data.getTitles();
//		int index = 0;
//		//表头
//		for(String title:titles){
//			sheet.addCell(new Label(index++, 0, title));
//		}
//		List<List<Object>> datas = data.getRows();
//		for(int i=0;i<datas.size();i++){
//			for(int j=0;j<datas.get(i).size();j++){
//				sheet.addCell(new Label(j, i+1, String.valueOf(datas.get(i).get(j))));
//			}
//		}
//	}
//
//}
