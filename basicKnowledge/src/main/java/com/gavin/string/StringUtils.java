package com.gavin.string;


import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import sun.misc.BASE64Encoder;

import static javax.swing.plaf.synth.Region.SEPARATOR;

public class StringUtils {
	public static final long ONE_KB = 1024;
	public static final long ONE_MB = ONE_KB * ONE_KB;
	public static final long ONE_GB = ONE_KB * ONE_MB;


	public static String countFileSize(File file) {
		return  countFileSize(file.getAbsolutePath());
	}
	/* [ExmayFileCountSize.java] */
	/**
	 * 统计文件大小
	 *
	 * @param pathname
	 * @return
	 */
	public static String countFileSize(String pathname) {
		String fileSizeString = "";
		try {
			File file = new File(pathname);
			DecimalFormat df = new DecimalFormat("#.00");
			long fileS = file.length();
			if (fileS < 1024) {
				fileSizeString = "0byte";
			} else if (fileS < 1048576) {
				fileSizeString = df.format((double) fileS / 1024) + "KB";
			} else if (fileS < 1073741824) {
				fileSizeString = df
						.format(((double) fileS / 1024 / 1024) - 0.01)
						+ "MB";
			} else {
				fileSizeString = df.format((double) fileS / 1024 / 1024 / 1024)
						+ "G";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileSizeString;
	}


	/**
	 * 根据File文件的长度统计文件的大小
	 *
	 * @param fileSize
	 *            File的长度 file.lenght()
	 * @return 返回文件大小
	 */
	public static String countFileSize(long fileSize) {
		String fileSizeString = "";
		try {
			DecimalFormat df = new DecimalFormat("#.00");
			long fileS = fileSize;
			if (fileS == 0) {
				fileSizeString = "0KB";
			} else if (fileS < 1024) {
				fileSizeString = df.format((double) fileS) + "B";
			} else if (fileS < 1048576) {
				fileSizeString = df.format((double) fileS / 1024) + "KB";
			} else if (fileS < 1073741824) {
				fileSizeString = df
						.format(((double) fileS / 1024 / 1024) - 0.01)
						+ "MB";
			} else {
				fileSizeString = df.format((double) fileS / 1024 / 1024 / 1024)
						+ "G";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileSizeString;
	}

	/**
	 * 根据File文件的长度统计文件的大小
	 *
	 * @param size
	 *            File的长度 file.lenght()
	 * @return 返回文件大小
	 */
	public static String byteCountToDisplaySize(long size) {
		String displaySize;
		if (size / ONE_GB > 0) {
			displaySize = String.valueOf(size / ONE_GB) + " G";
		} else if (size / ONE_MB > 0) {
			displaySize = String.valueOf(size / ONE_MB) + " MB";
		} else if (size / ONE_KB > 0) {
			displaySize = String.valueOf(size / ONE_KB) + " KB";
		} else {
			displaySize = String.valueOf(size) + " bytes";
		}
		return displaySize;
	}

	/**
	 *
	* @Title:isLeapYear
	* @author:Gavin
	* @date: 2019年5月9日下午3:17:15
	* @Description:判断是否是闰年
	* @param years
	* @param @return
	* @return boolean
	* @throws
	 */
	public static boolean isLeapYear(int years) {
		return (years % 4 == 0 && years % 100 != 0) || (years % 400 == 0);
	}

	/**
	 * switch 语句中的变量类型可以是： byte、short、int 或者 char。
	 * 从 Java SE 7 开始，switch 支持字符串 String 类型了，同时 case 标签必须为字符串常量或字面量。
	* @Title:getDays
	* @author:Gavin
	* @date: 2019年5月9日下午3:23:28
	* @Description: 判断一年中某个月有多少天
	* @param @param years
	* @param @param month
	* @param @return
	* @return dint
	* @throws
	 */
	public static int getMonthDays(int years,int month) {
		int result = 0;
		switch (month) {
		case 4:
		case 6:
		case 9:
		case 11:
			result = 30;
			break;
		case 2:
			result = isLeapYear(years) ? 29 : 28;
			break;
		default:
			result = 31;
			break;
		}
		return result;
	}


   /**
    * 判断一个元素是否为空，如果为空true 否则false
	* @Title:isEmpty
	* @author:Gavin
	* @date: 2019年5月9日下午5:00:33
	* @Description:
	* @version 1.0
	*
	* String s = "";这个字符串是有值的，是有指向的，可以调用方法。
	* String s = null; 这个是真的为空对象，他是没有指向的，他不能够调用方法，如果调用则会报空指针异常。
	* 所以不能写成content.equals("")
	*/
	public static boolean isEmpty(String str) {
		return null == str  || str.equals("")
				|| str.matches("\\s*");
	}

	/**
	 * 字符串非空判断
	 * @Title:isNotEmpty
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:02:58
	 * @Description:
	 * @version 1.0
	 */
	public static boolean isNotEmpty(String content){
		return !isEmpty(content);
	}

	/**
	 * 设定默认值
	 * @Title: defaultValue
	 * @author: Gavin
	 * @time: 2019年7月15日 下午6:50:23
	 * @param content
	 * @param defaultValue
	 * @return
	 * @return: String
	 * @throws
	 */
	public static String defaultValue(String content,String defaultValue){
		if(isEmpty(content)){
			return defaultValue;
		}
		return content;
	}

	/**
	 * 字符串转日期
	 * @Title:stringToDate
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:04:36
	 * @Description:
	 * @version 1.0
	 * @throws ParseException
	 */
	public static Date stringToDate(String dateString,String pattern) throws ParseException{
		return new SimpleDateFormat(pattern).parse(dateString);
	}

	/**
	 * 日期转成字符串
	 * @Title:dateToString
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:30:24
	 * @Description:
	 * @version 1.0
	 */
	public static String dateToString(Date date,String pattern) throws ParseException{
		return new SimpleDateFormat(pattern).format(date);
	}

	/**
	 * 将一个数字个格式化成为你的需要的金额【数字会四舍五入】<br/>
	 * eg:doubleToString(12.5698,"#.##")===12.57<br/>
	 * eg:doubleToString(12.5698,"0.00")===12.57<br/>
	 * eg:doubleToString(12,"0.00")===12.00<br/>
	 * eg:doubleToString(12,"#.##")===12<br/>
	 * @Title:doubleToString
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:38:25
	 * @Description:将一个数字个格式化成为你的需要的金额
	 * @version 1.0
	 */
	public static String doubleToString(Double num,String pattern) throws ParseException{
		return new DecimalFormat(pattern).format(num);
	}

	/**
	 * 替换字符串中所有的空格
	 * @Title:replaceAllTrim
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:43:57
	 * @Description:
	 * @version 1.0
	 */
	public static String replaceAllTrim(String content){
		return content.replaceAll("\\s*", "");
	}

	/**
	 * 判断一个字符是不是中文  （一个中文包含2个字节）
	 * @Title:isChineseChar
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:56:14
	 * @Description:
	 * @version 1.0
	 */
	public static boolean isChineseChar(char c) {
		try {
			return String.valueOf(c).getBytes("GBK").length>1;
		} catch (Exception e) {
			return false;
		}
	}


	/**
	 * 截取==我z中国 subString("我z中国",3)===我z<br/>
	 * @Title:subString
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:57:44
	 * @Description:
	 * @version 1.0
	 */
	public static String subString(String string,int start,int count){
		if(isEmpty(string))return "";
//		int start=0;
		StringBuilder builder = new StringBuilder();
		for (int i = start; i < count; i++) {
			char c=string.charAt(i);
			builder.append(c);
			if(isChineseChar(c)){//判断一个字符是不是汉子
				--count;
			}
		}
		return builder.toString();
	}

	/**
	 * 把传入的数转换为中文金额大写形式
	 * @Title:numFormat
	 * @author:Gavin
	 * @date: 2019年5月9日下午6:32:16
	 * @Description:
	 * @param flag int 标志位，1 表示转换整数部分，2表示转换小数部分
	 * @param s String 要转换的字符串
	 * @return 转换好的带单位的中文金额大写形式
	 * @version 1.0
	 */
	public static String numFormat(String s,int flag) {
		int sLength = s.length();
		// 货币大写形式
		String bigLetter[] = {"零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};
		// 货币单位
		String unit[] = {"元", "拾", "佰", "仟", "万",
				// 拾万位到仟万位
				"拾", "佰", "仟",
				// 亿位到万亿位
				"亿", "拾", "佰", "仟", "万"};
		String small[] = {"分", "角"};
		// 用来存放转换后的新字符串
		String newS = "";
		// 逐位替换为中文大写形式
		for(int i = 0; i < sLength; i ++) {
			if(flag == 1) {
				// 转换整数部分为中文大写形式（带单位）
				newS = newS + bigLetter[s.charAt(i) - 48] + unit[sLength - i - 1];
			} else if(flag == 2) {
				// 转换小数部分（带单位）
				newS = newS + bigLetter[s.charAt(i) - 48] + small[sLength - i - 1];
			}
		}
		return newS;
	}

	/**
	 * 获取文件的后缀
	 * @Title:getExt
	 * @author:Gavin
	 * @date: 2019年5月13日下午5:50:48
	 * @Description:
	 * @version 1.0
	 */
	public static String getExt(String path){
		if(isEmpty(path))return path;
		//String ext = path.substring(path.lastIndexOf(".")+1,path.length());
		String ext = path.substring(path.lastIndexOf(".")+1);
		return ext;
	}

	/**
	 * 获取带有点的后缀
	 * @Title:getExtPonit
	 * @author:Gavin
	 * @date: 2019年5月13日下午5:58:19
	 * @Description:
	 * @version 1.0
	 */
	public static String getExtPonit(String path){
		if(isEmpty(path))return path;
		String ext = path.substring(path.lastIndexOf("."));
		return ext;
	}
	/**
	 *
	 * @Title:getFileName
	 * @author:Gavin
	 * @date: 2019年5月13日下午5:56:26
	 * @Description:获取文件名
	 * @version 1.0
	 */
	public static String getFileName(String path){
		if(isEmpty(path))return path;
		String filename = path.substring(path.lastIndexOf("/")+1, path.lastIndexOf("."));
		return filename;
	}

	/**
	 * 验证码，文件随机数
	 * @Title:getRandomString
	 * @author:Gavin
	 * @date: 2019年5月13日下午6:27:40
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String getRandomString(int length) {
		StringBuffer bu = new StringBuffer();
		String[] arr = { "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
				"d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "p", "q",
				"r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C",
				"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P",
				"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
		Random random = new Random();
		while (bu.length() < length) {
			String temp = arr[random.nextInt(57)];
			if (bu.indexOf(temp) == -1) {
				bu.append(temp);
			}
		}
		return bu.toString();
	}

	/**
	 * 获取随机文件名
	 * @Title:getNewFileName
	 * @author:Gavin
	 * @date: 2019年5月14日上午9:04:45
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String getNewFileName(String filename){
		return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+"_"+getRandomString(5)+getExtPonit(filename);
	}

	/**
	 * 根据用户ID获取文件随机名
	 * @Title:getNewFileName
	 * @author:Gavin
	 * @date: 2019年5月14日上午9:14:28
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String getNewFileName(String filename,Integer userId){
		return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+"_"+getRandomString(4)+"_"+userId+getExtPonit(filename);
	}

	/**
	 * MD5加密
	 * @Title:md5Base64
	 * @author:Gavin
	 * @date: 2019年5月14日上午9:22:27
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String md5Base64(String str) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			return base64Encode(md5.digest(str.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String base64Encode(byte[] b) {
		if (b == null) {
			return null;
		}
		return new BASE64Encoder().encode(b);
	}

	/**
	 * 凯撒密码加密
	 * @Title:encryption
	 * @author:Gavin
	 * @date: 2019年5月14日上午9:49:58
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String encryption(String str,int k){
		String string = "";
		for (int i = 0; i < str.length(); i++) {
			char c= str.charAt(i);
			if(c>='a' && c<='z'){
				c += k%26;
				if(c<'a'){
					c+=26;
				}
				if(c>'z'){
					c-=26;
				}
			}else if(c>='A' && c<='Z'){
				c+=k%26;
				if(c<'A'){
					c+=26;
				}
				if(c>'Z'){
					c-=26;
				}
			}
			string+=c;
		}
		return string;
	}

	/**
	 * 凯撒密码解密
	 * @Title:dencryption
	 * @author:Gavin
	 * @date: 2019年5月14日上午9:50:30
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String dencryption(String str,int n){
		String string = "";
		int k = Integer.parseInt("-"+n);
		for (int i = 0; i < str.length(); i++) {
			char c= str.charAt(i);
			if(c>='a' && c<='z'){
				c += k%26;
				if(c<'a'){
					c+=26;
				}
				if(c>'z'){
					c-=26;
				}
			}else if(c>='A' && c<='Z'){
				c+=k%26;
				if(c<'A'){
					c+=26;
				}
				if(c>'Z'){
					c-=26;
				}
			}
			string+=c;
		}
		return string;
	}

	/**
	 * 根据后缀判断是不是图片
	 * @Title:isImage
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:03:58
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isImage(String ext) {
		return ext.toLowerCase().matches("jpg|gif|bmp|png|jpeg");
	}

	/**
	 * 根据后缀判断是不是offce文档
	 * @Title:isDoc
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:04:34
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isDoc(String ext) {
		return ext.toLowerCase().matches("doc|docx|xls|xlsx|pdf|txt|ppt|pptx");
	}

	/**
	 * 根据后缀判断是不是音频
	 * @Title:isVideo
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:05:06
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isVideo(String ext) {
		return ext.toLowerCase().matches("mp4|flv|mp3");
	}

	/**
	 * 替换标签符号位转义符号
	 * @Title:htmlEncode
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:05:56
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String htmlEncode(String txt) {
		if (null != txt) {
			txt = txt.replace("&", "&amp;").replace("&amp;amp;", "&amp;")
					.replace("&amp;quot;", "&quot;").replace("\"", "&quot;")
					.replace("&amp;lt;", "&lt;").replace("<", "&lt;")
					.replace("&amp;gt;", "&gt;").replace(">", "&gt;")
					.replace("&amp;nbsp;", "&nbsp;");
		}
		return txt;
	}

	/**
	 * 整数的转换与0补齐
	 * @Title:formatNO
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:07:00
	 * @Description:str 转换的数字  length 转换的长度，不够补0
	 * @version 1.0
	 */
	public static String formatNO(int str, int length) {
		float ver = Float.parseFloat(System
				.getProperty("java.specification.version"));
		String laststr = "";
		if (ver < 1.5) {
			try {
				NumberFormat formater = NumberFormat.getNumberInstance();
				formater.setMinimumIntegerDigits(length);
				laststr = formater.format(str).toString().replace(",", "");
			} catch (Exception e) {
				System.out.println("格式化字符串时的错误信息：" + e.getMessage());
			}
		} else {
			Integer[] arr = new Integer[1];
			arr[0] = new Integer(str);
			laststr = String.format("%0" + length + "d", arr);
		}
		return laststr;
	}

	/**
	 * 字符串数组转换成字符串
	 * @Title:arrToString
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:08:55
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String arrToString(String[] strings, String separtor) {
		StringBuffer buffer = new StringBuffer();
		if (strings != null) {
			for (String string : strings) {
				buffer.append(string + separtor);
			}
			String result = buffer.toString();
			return result.substring(0, result.length() - 1);
		} else {
			return "";
		}
	}

	/**
	 * 首字母转换为大写
	 * @Title:toUpperCaseFirst
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:10:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String toUpperCaseFirst(String text) {
		return text.substring(0, 1).toUpperCase() + text.substring(1);
	}

	/**
	 * 首字母转换为小写
	 * @Title:toUpperCaseFirst
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:10:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String toLowerCaseFirst(String text) {
		return text.substring(0, 1).toLowerCase() + text.substring(1);
	}

	/**
	 * 得到首字符
	 * @Title:toUpperCaseFirst
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:10:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String getFirstChar(String text) {
		return text.substring(0, 1);
	}

	/**
	 * 判断是否为数字
	 * @Title:toUpperCaseFirst
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:10:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isNumeric(String str) {
		Matcher isNum = Pattern.compile("(-|\\+)?[0-9]+(.[0-9]+\\+)?").matcher(
				str);
		return isNum.matches();
	}


	/**
	 * 判断字符串是否都是数字组成
	 * @Title:toUpperCaseFirst
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:10:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isNumber(String numString) {
		return StringUtils.isNumeric(numString);
	}

	/**
	 * 验证邮箱
	 * @Title:isEmail
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:13:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isEmail(String email) {
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 验证手机号码
	 * @Title:isMobile
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:13:38
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isMobile(String mobiles) {
		boolean flag = false;
		try {
			Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
			Matcher m = p.matcher(mobiles);
			flag = m.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 网络地址验证
	 * @Title:isHomepage
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:15:13
	 * @Description:TODO
	 * @version 1.0
	 */
	public static boolean isHomepage(String str) {
		String regex = "http://(([a-zA-z0-9]|-){1,}\\.){1,}[a-zA-z0-9]{1,}-*";
		return match(regex, str);
	}

	private static boolean match(String regex, String str) {
		Pattern pattern = Pattern.compile(regex);// 将给定的正则表达式编译到具有给定标志的模式中
		Matcher matcher = pattern.matcher(str);// 模式进行匹配字符串
		return matcher.matches();
	}

	/**
	 * listToString 集合转成字符串
	 * @Title:listToString
	 * @author:Gavin
	 * @date: 2019年5月14日上午10:16:14
	 * @Description:TODO
	 * @version 1.0
	 */
	public static String listToString(List<String> params, String sepator) {
		if (params.size() > 0) {
			StringBuffer buffer = new StringBuffer();
			for (String string : params) {
				buffer.append(string + sepator);
			}
			String result = buffer.toString();
			return result.substring(0, result.length() - 1);
		} else {
			return "";
		}
	}

	/**
	 * 获取char 字符对应的数字
	 * @Title: getCharNumber
	 * @author: Gavin
	 * @time: 2019年7月4日 下午1:41:18
	 * @param string
	 * @return: void
	 * @throws
	 */
	public static void getCharNumber(String string) {
		//String a = "中国人高明洪磊";
		// 将String对象中的每一个下标位的对象保存在数组中
		char[] b = string.toCharArray();
		// 转换成响应的ASCLL
		for (char c : b) {
			System.out.println(c+"===="+Integer.valueOf(c));
		}
	}

	/**
	 * 将下划线大写方式命名的字符串转换为驼峰式。如果转换前的下划线大写方式命名的字符串为空，则返回空字符串。 例如：HELLO_WORLD->HelloWorld
	 *
	 * @param name 转换前的下划线大写方式命名的字符串
	 * @return 转换后的驼峰式命名的字符串
	 */
	public static String convertToCamelCase(String name)
	{
		StringBuilder result = new StringBuilder();
		// 快速检查
		if (name == null || name.isEmpty())
		{
			// 没必要转换
			return "";
		}
		else if (!name.contains("_"))
		{
			// 不含下划线，仅将首字母大写
			return name.substring(0, 1).toUpperCase() + name.substring(1);
		}
		// 用下划线将原始字符串分割
		String[] camels = name.split("_");
		for (String camel : camels)
		{
			// 跳过原始字符串中开头、结尾的下换线或双重下划线
			if (camel.isEmpty())
			{
				continue;
			}
			// 首字母大写
			result.append(camel.substring(0, 1).toUpperCase());
			result.append(camel.substring(1).toLowerCase());
		}
		return result.toString();
	}


	/**
	 * 是否包含字符串
	 *
	 * @param str 验证字符串
	 * @param strs 字符串组
	 * @return 包含返回true
	 */
	public static boolean inStringIgnoreCase(String str, String... strs)
	{
		if (str != null && strs != null)
		{
			for (String s : strs)
			{
				if (str.equalsIgnoreCase(trim(s)))
				{
					return true;
				}
			}
		}
		return false;
	}


	/**
	 * 下划线转驼峰命名
	 */
	public static String toUnderScoreCase(String str)
	{
		if (str == null)
		{
			return null;
		}
		StringBuilder sb = new StringBuilder();
		// 前置字符是否大写
		boolean preCharIsUpperCase = true;
		// 当前字符是否大写
		boolean curreCharIsUpperCase = true;
		// 下一字符是否大写
		boolean nexteCharIsUpperCase = true;
		for (int i = 0; i < str.length(); i++)
		{
			char c = str.charAt(i);
			if (i > 0)
			{
				preCharIsUpperCase = Character.isUpperCase(str.charAt(i - 1));
			}
			else
			{
				preCharIsUpperCase = false;
			}

			curreCharIsUpperCase = Character.isUpperCase(c);

			if (i < (str.length() - 1))
			{
				nexteCharIsUpperCase = Character.isUpperCase(str.charAt(i + 1));
			}

			if (preCharIsUpperCase && curreCharIsUpperCase && !nexteCharIsUpperCase)
			{
				sb.append(SEPARATOR);
			}
			else if ((i != 0 && !preCharIsUpperCase) && curreCharIsUpperCase)
			{
				sb.append(SEPARATOR);
			}
			sb.append(Character.toLowerCase(c));
		}

		return sb.toString();
	}


	/**
	 * 去空格
	 */
	public static String trim(String str)
	{
		return (str == null ? "" : str.trim());
	}

	/**
	 * @Author gaoming
	 * @Description //TODO 获取uuid
	 * @Date 17:09 2020/10/9
	 * @Param
	 * @return
	 **/
	public static String getUUId() {
		return UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
	}

	/**
	 * 快捷键：Ctrl + o 查看当前类中所有的属性和方法
	 *        Ctrl + l 定位行
	 *        Ctrl + f 当前类搜索
	 *        Ctrl + shift + r 全文搜索
	 *        ctrl+shift+o--导入包
	 * @Title:main
	 * @author:Gavin
	 * @date: 2019年5月9日下午5:06:05
	 * @Description:测试函数
	 * @version 1.0
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		//stringToDate
//		Date date = stringToDate("2018/09/13", "yyyy/MM/dd");
//		System.out.println(date);

		//dateToString
//		String str = dateToString(new Date(), "yyyy/MM/dd HH:mm:ss");
//		System.out.println(str);

		///doubleToString
//		String string = doubleToString(132.4456, "0.000");//132.45
//		System.out.println(string);

		//replaceAllTrim
//		String str = replaceAllTrim("i love you");
//		System.out.println(str);

//		System.out.println(isChineseChar('中'));

//		String str = "我愛ni中囯";
//		System.out.println(subString(str,0, 5));//我愛n

		//numFormat 加小数部分要拼接
//		String string = numFormat("111", 1);
//		String string2 = numFormat("88", 2);
//		System.out.println(string+string2);

//		String string = getExt("StringUtils.java");
//		System.out.println(string);

//		String string = getNewFileName("gavin.java",3);
//		System.out.println(string);

//		System.out.println(md5Base64("123456"));//百度搜MD5解密即可解开
//		System.out.println(md5Base64("gavin_123456"));//百度解不开，需付费，加盐加密
//		System.out.println(md5Base64(md5Base64("123456")));//百度解不开，需付费

//		System.out.println(encryption("abcd", 2));
//		System.out.println(dencryption("cdef", 2));

		//System.out.println(isNumeric("12"));


		//真正的uuid  机器码+时间+ip地址+ UUID
//		System.out.println(UUID.randomUUID().toString());
//		System.out.println(UUID.randomUUID().toString());
//		System.out.println(UUID.randomUUID().toString());

		//System---获取操作系统里面的一些常量信息
//		System.out.println(System.getProperty("os.name"));
//		System.out.println(System.getProperty("java.home"));
//		System.out.println(System.getProperty("user.dir"));
//		
//		//ctrl+shift+o--导入包
		//Properties properties=System.getProperties();
//		Enumeration<Object> enumeration=properties.elements();
//		while (enumeration.hasMoreElements()) {
//			Object object = (Object) enumeration.nextElement();
//			System.out.println(object);
//		}

//		Properties properties=System.getProperties();
//		Enumeration<?> enumeration= properties.propertyNames();
//		while (enumeration.hasMoreElements()) {
//			Object object = (Object) enumeration.nextElement();
//			System.out.println(object+"====="+System.getProperty(String.valueOf(object)));
//		}
//		

		//RunTime
//		Runtime runtime = Runtime.getRuntime();
//		long max=runtime.maxMemory()/1024/1024;
//		long total=runtime.totalMemory()/1024/1024;
//		long free=runtime.freeMemory()/1024/1024;
//		System.out.println("运行时的对象:"+runtime.availableProcessors());
//		System.out.println("最大内存数"+max);//
//		System.out.println("空闲的内存数"+free);
//		System.out.println("总内存数"+total);
//		System.out.println("剩余内存大小："+(max-total+free));


		//Math函数---数学--三角函数，绝对性，平方根，大小运算，四舍五入 乘方
//   	Math.toDegrees(hudu)//弧度转成角度
//		System.out.println(Math.toDegrees(3.14));//角度转成弧度
//		System.out.println(Math.toRadians(90));
//		圆的周长==2πr
//		180 = π
//		90 =90π/180--直角三角形
	//正弦---对边/斜边
//	System.out.println(Math.sin(Math.toRadians(30)));
//	System.out.println(Math.sin(Math.toRadians(60)));
//	//余弦---邻边/斜边
//	System.out.println(Math.cos(Math.toRadians(30)));
//	System.out.println(Math.cos(Math.toRadians(60)));
//	
//	//反余弦
//	System.out.println(Math.acos(Math.toRadians(30)));
////	System.out.println(Math.acos(Math.toRadians(60)));
//	//反正弦
//	System.out.println(Math.asin(Math.toRadians(30)));
////	System.out.println(Math.asin(Math.toRadians(60)));
//	
//	//正切
//	System.out.println(Math.tan(Math.toRadians(30)));

	//通用--字符串 Math
//	double s = 10.7;
//	System.out.println(Math.floor(s));//10.0
//	System.out.println(Math.ceil(s));//11.0
//	
//	
//	//四舍五入--无法保留小数
//	double c =3.569;
//	System.out.println(Math.round(c));
//	String cstr= new DecimalFormat("#.##").format(c);
//	System.out.println(cstr);
//	
//	//平方根
//	System.out.println(Math.sqrt(3));
//	//立方根
//	System.out.println(Math.cbrt(27));
	//次幂
//	System.out.println(Math.exp(3));

//	//a的b次方
//	System.out.println(Math.pow(3, 2));//3*3
//	System.out.println(Math.pow(3, 3));//3*3*3

//	3*3+2*2+1*1 --阶乘求和
//	3*2*1+2*+1*1	
//	
//	System.out.println(Math.PI);//π--圆周率
//	System.out.println(Math.E);//自然指数

	//最大值 最小值
//	Math.min(12, 1);//1
//	Math.max(12, 1);//12


//	//绝对值
//	System.out.println(Math.abs(-2));
//	System.out.println(Math.abs(2));


	//java基础数据数字--布尔类型
	//byte short int long float double char 数字类型
	//boolean 布尔


	//BigDecimal 在讲一次
//	BigDecimal b1= new BigDecimal(1);
//	BigDecimal b2= new BigDecimal(3);
//	BigDecimal b3=b1.add(b2);//相加
//	BigDecimal b3=b1.subtract(b2);//相减
//	BigDecimal b3=b1.multiply(b2);//相乘
//	BigDecimal b3=b1.divide(b2,18,BigDecimal.ROUND_HALF_UP);//相除
//	System.out.println(b3);

//	System.out.println(1/3d);

	}
}
