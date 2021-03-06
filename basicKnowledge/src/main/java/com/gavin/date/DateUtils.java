package com.gavin.date;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 日期处理公用类
 * 
 * @author libing
 */

public class DateUtils extends org.apache.commons.lang3.time.DateUtils{

	/**
	 * 把字符串转换成Calendar
	 * 
	 * @param dateStr(表示日期的字符串如2004-12-12，2004/12/12，2004年12月12日)
	 * @return
	 */
	public static Calendar parseToCalendar(String dateStr) {
		if (StringUtils.isValid(dateStr)) {
			String dStr = null;
			String tStr = null;
			int pos = dateStr.indexOf(" ");
			if (pos != -1) {
				dStr = dateStr.substring(0, pos);
				tStr = dateStr.substring(pos + 1);
			} else {
				dStr = dateStr;
			}

			Calendar cal = null;
			if (StringUtils.isValid(dStr)) {
				String[] dArray = null;
				if (dStr.indexOf("/") != -1) {
					dArray = StringUtils.SplitString(dStr, "/");
				} else if (dStr.indexOf("-") != -1) {
					dArray = StringUtils.SplitString(dStr, "-");
				} else if (dStr.indexOf("年") != -1) {
					int p = dStr.indexOf("年");
					dArray = new String[3];
					dArray[0] = dStr.substring(0, p);

					String temp = dStr.substring(p + 1);

					if (StringUtils.isValid(temp)) {
						if (temp.indexOf("月") != -1) {
							p = temp.indexOf("月");
							dArray[1] = temp.substring(0, p);
							temp = temp.substring(p + 1);
							if (StringUtils.isValid(temp)) {
								if (temp.indexOf("日") != -1) {
									p = temp.indexOf("日");
									dArray[2] = temp.substring(0, p);
								} else {
									dArray[2] = temp;
								}
							}
						}
					}
				}

				if (StringUtils.isValid(dArray, 3)) {

					int year = Integer.parseInt(dArray[0]);
					if (year < 1000) {
						year += 2000;
					}

					int month = Integer.parseInt(dArray[1]);
					int day = Integer.parseInt(dArray[2]);

					cal = Calendar.getInstance();
					cal.set(Calendar.YEAR, year);
					cal.set(Calendar.MONTH, month - 1);
					cal.set(Calendar.DAY_OF_MONTH, day);
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
				}

			}

			if (StringUtils.isValid(tStr)) {
				String[] tArray = null;
				tArray = StringUtils.SplitString(tStr, ":");
				if (StringUtils.isValid(tArray, 3)) {
					int hour = Integer.parseInt(tArray[0]);
					int mm = Integer.parseInt(tArray[1]);
					int ss = Integer.parseInt(tArray[2].substring(0, 2));
					cal.set(Calendar.HOUR_OF_DAY, hour);
					cal.set(Calendar.MINUTE, mm);
					cal.set(Calendar.SECOND, ss);
				}
			}
			return cal;
		}
		throw new IllegalArgumentException();
	}
	/** 
	  *   把字符穿转换成 Date 如（20120707）或（2012-07-07）
	  *   @param   bYmd 
	  *   @return   Date 
	  *   @throws   Exception 
	  */ 
	public static Date  DatestringToTimestamp(String   bYmd)   throws   Exception   { 
	Date   d   =   null; 
	try   { 
		if   (bYmd   ==   null   ||   bYmd.trim().length()   ==   0)   { 
			return   null; 
		}   
		else   { 
			 if   (bYmd.length()   ==   8)   { 
				bYmd   = 
				bYmd.substring(0,   4) 
				+   "-" 
				+   bYmd.substring(4,   6) 
				+   "-" 
				+   bYmd.substring(6); 
				}
			 SimpleDateFormat   sdf   = 
				 new   SimpleDateFormat( "yyyy-MM-dd"); 
	                        d   =   sdf.parse(bYmd); 
		} 
	}   catch   (Exception   e)   { 
	throw   e; 
	} 
	return   d; 
	}
	/**
	 * 把日期字符串转换成Date
	 * 
	 * @param dateStr(表示日期的字符串如2004-12-12，2004/12/12，2004年12月12日)
	 * @return
	 */
	public static Date parseToDate(String dateStr) {
		if(dateStr ==null || dateStr.equals("")){
			return null;
		}
		Calendar cal = parseToCalendar(dateStr);
		return new Date(cal.get(Calendar.YEAR) - 1900, cal.get(Calendar.MONTH),
				cal.get(Calendar.DAY_OF_MONTH), cal.get(Calendar.HOUR_OF_DAY),
				cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND));
	}

	/**
	 * 把日期字符串转换成Date
	 * 
	 * @param dateStr(表示日期的字符串如2004-12-12，2004/12/12，2004年12月12日)
	 * @return
	 */
	public static Date parseToDate(String dateStr, String format) {
		if(dateStr == null){
			return null;
		}
		DateFormat df = new SimpleDateFormat(format);
		try {
			return df.parse(dateStr);
		} catch (ParseException e) {
			return null;
		}
	}
	/**
	 *  把日期字符串转换成想要的格式
	 * @param dateStr 日期
	 * @param format 自带格式比如：yyyy-MM-dd HH:mm:ss
	 * @param fromatmt 需要转换格式比如：yyyyMMdd
	 * @return 将yyyy-MM-dd HH:mm:ss字符串的日期转换为yyyyMMdd的日期字符串
	 */
	public static String parseToString(String dateStr, String format,String fromatmt) {
		if(dateStr == null){
			return null;
		}
		try {
			DateFormat df = new SimpleDateFormat(format);
			DateFormat dff = new SimpleDateFormat(fromatmt);
			Date date =  df.parse(dateStr);
			return dff.format(date);
		} catch (ParseException e) {
			return null;
		}

	}
	
	public static Date parseToDateTwo(String dateStr) {
		//yyyy-MM-dd HH:mm:ss
		return parseToDate(dateStr,"yyyy-MM-dd");
	}
	
	/**
	 * 获得当前日期
	 * 
	 * @return 以YYYY-MM-DD的形式返回
	 */
	public static String getNowString() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
		String result = df.format(new Date());
		// result = StringUtils.replace(result, "年", "-");
		// result = StringUtils.replace(result, "月", "-");
		// result = StringUtils.replace(result, "日", "");
		return result;
	}

	/**
	 * 获得当前时间
	 * 
	 * @return 以YYYY-MM-DD hh:mm:ss的形式返回
	 */
	public static String getNowTimeString() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String result = df.format(new Date());
		return result;
	}
	
	/**
	 * 获取当前年份
	 * @return 以int的形式返回
	 */
	public static int getNowYear(){
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		return year;
	}
	

	/**
	 * 获得当前对象年度
	 * 
	 * @return 以YYYY形式返回
	 */
	public static String getNowNianDu() {
		String result;
		String nowDate = getNowString();
		if (nowDate.split("-")[1].compareTo("10") >= 0) {
			result = String.valueOf((Integer.parseInt(nowDate.split("-")[0]) + 1));
		} else {
			result = nowDate.split("-")[0];
		}
		return result;
	}
	
    /**
     * 获得设定对象年度
     * 
     * @return 以YYYY形式返回
     */
    public static String getNianDu(Date date) {
        String result = null;
        if (date != null){
            String strDate = formatDate(date, "yyyy-MM-dd");
            if (strDate.split("-")[1].compareTo("10") >= 0) {
                result = String.valueOf((Integer.parseInt(strDate.split("-")[0]) + 1));
            } else {
                result = strDate.split("-")[0];
            }
        }
        return result;
    }
    
	/**
	 * 格式化日期
	 * 
	 * @param date
	 *            Date对象
	 * @param mask
	 *            格式掩码
	 * @return 经过格式化的日期字符串
	 */
	public static String formatDate(Date date, String mask) {
		if (date == null)
			return "";
		DateFormat df = new SimpleDateFormat(mask);
		return df.format(date);
	}
	/**
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		if (date == null)
			return "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(date);
	}
	

	/**
	 * 把Calendar对象转换成Date对象
	 * 
	 * @param cal
	 * @return
	 */
	public static Date calendarToDate(Calendar cal) {
		return cal.getTime();

	}

	public static Calendar dateToCal(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, date.getYear() + 1900);
		cal.set(Calendar.MONTH, date.getMonth());
		cal.set(Calendar.DAY_OF_MONTH, date.getDate());
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal;
	}

	/**
	 * 根据Calendar获得相应的中文日期
	 * 
	 * @param cal
	 * @return
	 */
	public static String calendarToCN(Calendar cal) {
		// final String[] digits =
		// { "零", "壹", "貳", "叁", "肆", "伍", "陆", "柒", "捌", "玖", };

		final String[] digits = { "零", "一", "二", "三", "四", "五", "六", "七", "八",
				"九", };

		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH);
		int day = cal.get(Calendar.DAY_OF_MONTH);

		String yearStr = String.valueOf(year);
		String monthStr = String.valueOf(month);
		String dayStr = String.valueOf(day);

		StringBuffer sb = new StringBuffer();
		int t = Character.getNumericValue(yearStr.charAt(0));
		sb.append(digits[t]);
		t = Character.getNumericValue(yearStr.charAt(1));
		sb.append(digits[t]);
		t = Character.getNumericValue(yearStr.charAt(2));
		sb.append(digits[t]);
		t = Character.getNumericValue(yearStr.charAt(3));
		sb.append(digits[t]);
		sb.append("年");
		if (monthStr.length() == 1) {
			t = Character.getNumericValue(monthStr.charAt(0));
			sb.append(digits[t]);
		} else if (monthStr.length() == 2) {
			t = Character.getNumericValue(monthStr.charAt(0));
			if (t != 1)
				sb.append(digits[t]);
			sb.append("十");
			t = Character.getNumericValue(monthStr.charAt(1));
			sb.append(digits[t]);
		}

		sb.append("月");

		if (dayStr.length() == 1) {
			t = Character.getNumericValue(dayStr.charAt(0));
			sb.append(digits[t]);
		} else if (dayStr.length() == 2) {
			t = Character.getNumericValue(dayStr.charAt(0));
			if (t != 1)
				sb.append(digits[t]);
			sb.append("十");
			t = Character.getNumericValue(dayStr.charAt(1));
			sb.append(digits[t]);
		}

		sb.append("日");
		return sb.toString();
	}

	/**
	 * 根据Date对象获取相应的中文日期
	 * 
	 * @param date
	 * @return
	 */
	public static String dateToCN(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return calendarToCN(cal);
	}

	/**
	 * 根据日期字符串获取相应的中文日期
	 * 
	 * @param str
	 * @return
	 */
	public static String strToCN(String str) {
		Calendar cal = parseToCalendar(str);
		return calendarToCN(cal);
	}

	/**
	 * 日期计算 days>0,date之后的days天
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date computDate(Date date, int days) {
		long l = 24l * 60l * 60l * 1000l * days;
		return new Date(date.getTime() + l);
	}

	public static int calcMonths(Date d1, Date d2) {
		int result = 0;
		Date sd = null;
		Date bd = null;
		if (d1.before(d2)) {
			sd = d1;
			bd = d2;
		} else {
			if (d1.after(d2)) {
				sd = d2;
				bd = d1;
			} else {
				return 1;
			}
		}

		int sbox = calcMonthBox(sd);
		int bbox = calcMonthBox(bd);

		int sy = sd.getYear();
		int by = bd.getYear();

		int factor = 12;
		if (bbox == 13)
			factor = 13;

		result = (by - sy) * factor + bbox - sbox + 1;

		return result;
	}

	public static int calcMonths2(Date d1, Date d2) {
		int result = 0;
		Date sd = null;
		Date bd = null;
		if (d1.before(d2)) {
			sd = d1;
			bd = d2;
		} else {
			if (d1.after(d2)) {
				sd = d2;
				bd = d1;
			} else {
				return 1;
			}
		}

		int sbox = calcMonthBox2(sd);
		int bbox = calcMonthBox2(bd);

		int sy = sd.getYear();
		int by = bd.getYear();

		result = (by - sy) * 12 + bbox - sbox;

		return result;
	}

	private static int calcMonthBox(Date d1) {
		int box = 1;
		int d = d1.getDate();
		int m = d1.getMonth() + 1;

		if (m != 12) {
			if (d < 26)
				box = m;
			else
				box = m + 1;

		} else {
			box = m + 1;
		}

		return box;
	}

	private static int calcMonthBox2(Date d1) {
		int box = 1;
		int d = d1.getDate();
		int m = d1.getMonth() + 1;

		if (m != 12) {
			if (d < 26)
				box = m;
			else
				box = m + 1;

		} else {
			box = m;
		}

		return box;
	}

	/**
	 * 获得特定月的日期
	 * 
	 * @param cal
	 * @return
	 */
	public static int getMonthLen(Calendar cal) {
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8
				|| month == 10 || month == 12)
			return 31;
		else if (month == 2)
			return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29
					: 28;
		else
			return 30;
	}

	/**
	 * 得到日期之间的天数
	 * 
	 * @param from
	 * @param end
	 * @return
	 */
	public static Integer getDaysBetweenTwoDates(Date from, Date end) {
		if ((from == null) || (end == null))
			return null;

		long fromL = from.getTime();
		long endL = end.getTime();
		double diff = (endL - fromL) / 86400000L;
		return new Integer(new Double(Math.ceil(diff)).intValue());
	}

	/**
	 * 2010-09-10 到 2010-09-10 为1个月 2010-09-10 到 2010-10-10 为2个月
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	public static String getMonthsBetween2Date(Date fromDate, Date toDate) {
		if ((fromDate == null) || (toDate == null))
			return null;
		int times = 1;
		if (!(fromDate.after(toDate))) {
			Calendar calfrom = Calendar.getInstance();
			Calendar calto = Calendar.getInstance();
			calfrom.setTime(fromDate);
			calfrom.set(5, 1);
			calto.setTime(toDate);
			calto.set(5, 1);
			while (calfrom.before(calto)) {
				calfrom.add(2, 1);
				++times;
			}
		} else {
			return "0";
		}
		return new Integer(times).toString();
	}

	/**
	 * 2010-09-10 到 2010-09-10 为0个月 2010-09-10 到 2010-10-10 为1个月
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	public static String getFullMonthsBetween2Date(Date fromDate, Date toDate) {

		String result = null;

		int months = Integer.parseInt(getMonthsBetween2Date(fromDate, toDate));

		result = String.valueOf(months - 1);

		return result;
	}
	
	/**
	 * 2010-09-10 到 2010-09-10 为0个月 2010-09-10 到 2010-10-10 为1个月
	 * 
	 * @param fromDate
	 * @param toDate
	 * @return
	 */
	public static String getAllMonthsBetween2Date(Date fromDate, Date toDate) {
		if ((fromDate == null) || (toDate == null))
			return null;
		int times = 0;
		if (!(fromDate.after(toDate))) {
			Calendar calfrom = Calendar.getInstance();
			Calendar calto = Calendar.getInstance();
			calfrom.setTime(fromDate);
			calto.setTime(toDate);
			calfrom.add(2, 1);
			while (!calfrom.after(calto)) {
				calfrom.add(2, 1);
				times++;
			}
		}
		return new Integer(times).toString();
	}
	
	/**
	 * 获得指定日期N个月后的日期减1
	 * @param inputDate
	 * @param number
	 * @return
	 */
	public static String  getAfterMonthBeforOneDay(String inputDate,int number) {
        Calendar c = Calendar.getInstance();//获得一个日历的实例   
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
        Date date = null;   
        try{   
            date = sdf.parse(inputDate);//初始日期   
        }catch(Exception e){  

        }   
        c.setTime(date);//设置日历时间   
        c.add(Calendar.MONTH,number);//在日历的月份上增加6个月
        c.add(Calendar.DAY_OF_MONTH, -1);
        String strDate = sdf.format(c.getTime());//的到你想要得6个月后的日期   
        return strDate;
	}
	/**
	 * 获得指定日期下一天的日期
	 * @param inputDate
	 * @param inputDate
	 * @return
	 */
	public static String  getAfterMonth(String inputDate) {
        Calendar c = Calendar.getInstance();//获得一个日历的实例   
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
        Date date = null;   
        try{   
            date = sdf.parse(inputDate);//初始日期   
        }catch(Exception e){  

        }   
        c.setTime(date);//设置日历时间   
        c.add(Calendar.DAY_OF_MONTH,1);//在日历的月份上增加6个月
        String strDate = sdf.format(c.getTime());//的到你想要得6个月后的日期   
        return strDate;
	}
	/**
	 * 获得指定日期N个月后的日期
	 * @param inputDate
	 * @param number
	 * @return
	 */
	public static String  getAfterMonth(String inputDate,int number) {
        Calendar c = Calendar.getInstance();//获得一个日历的实例   
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
        Date date = null;   
        try{   
            date = sdf.parse(inputDate);//初始日期   
        }catch(Exception e){  

        }   
        c.setTime(date);//设置日历时间   
        c.add(Calendar.MONTH,number);//在日历的月份上增加6个月
        String strDate = sdf.format(c.getTime());//的到你想要得6个月后的日期   
        return strDate;
	}
	/**
	 * 输入一个日期 获得该日期的月初日期
	 * @param date
	 * @return
	 */
	 public static  String getMinMonthDate(String date){   
		 SimpleDateFormat dateFormat =new  SimpleDateFormat("yyyy-MM-dd");
		     Calendar calendar = Calendar.getInstance();   
		     
			try {
				calendar.setTime(dateFormat.parse(date));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}   
		       calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));   
		     return dateFormat.format(calendar.getTime());   
	 }   
	 public static String getMaxMonthDate(String date) {   
		 SimpleDateFormat dateFormat =new  SimpleDateFormat("yyyy-MM-dd");
		      Calendar calendar = Calendar.getInstance();   
		        try {
					calendar.setTime(dateFormat.parse(date));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}   
		       calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));   
		       return dateFormat.format(calendar.getTime());   
	 }

    public static Date getMaxMonthDate(Date date) {
        if (date != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
            return calendar.getTime();
        }
        return null;
    }

	/**
	 * 判断当前年龄是否大于指定的年龄
	 */
	 public static boolean isGreaterAge(Date csny, int age) {
		Calendar c = Calendar.getInstance();
		c.setTime(csny);
		c.add(Calendar.YEAR, age);
		return c.getTime().compareTo(new Date()) <= 0;
	}
	 
	 /**
	  * 获取当前月份的最后一天
	  */
	 public static Date getLastDayOfMounth(){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return calendar.getTime();
	 }
	 
	 /**
      * 判断2个日期是否相等
      */
    public static boolean equals(Date date1, Date date2) {
        return date1 == null ? date2 == null : date1.equals(date2);
    }
    
	 
	/**
     * 格式化日期类型数据（参数是object）
     */
    public static String dateToString(Object o) {
		if (o instanceof java.util.Date) {
			return formatDate((Date) o, "yyyy-MM-dd");
		} else if (o instanceof java.sql.Date) {
			return formatDate((java.sql.Date) o, "yyyy-MM-dd");
		} 
		return "";
    }
    
    /**
     * 获取指定日期月份的最后一天
     * @param date
     * @return
     */
    public static Date getLastDayOfMounth(Date date){
    	Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
		return c.getTime();
    }
    
    /**
     * 根据日期和时间部分拼接成一个新的Date
     */
    public static Date getNewDate(Date date, String time){
    	if(!StringUtils.hasValue(time)){
    		return date;
    	}
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String s = dateFormat.format(date);
		s = s + " " + time;
		dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		try {
			date = dateFormat.parse(s);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
    }
   
    /**
     * 计算实际年龄
     * @param birthday 生日
     * @param date     所需计算的日期，与生日计算出年龄
     * @return 数组[年龄(超过一年返回岁，不足一年，返回月，不足月，返回天),1：岁 2：月 3：天]
     */
    public static String[] getRealAge(Date birthday, Date date) {
        if (birthday == null || date == null) {
            return null;
        }
        if (date.getTime() < birthday.getTime()) {
            return null;
        }
        // 生日
        Calendar cBirth = Calendar.getInstance();
        cBirth.setTime(birthday);
        // 计算所用日期
        Calendar cDate = Calendar.getInstance();
        cDate.setTime(date);
        
        cBirth.add(Calendar.YEAR, 1);
        if (compareDate(cBirth.getTime(), cDate.getTime(), "yyyyMMdd") <= 0) { // 大于1年，返回岁
            cBirth.setTime(birthday);//日期还原
            int addYear = 0;
            while (compareDate(cBirth.getTime(), cDate.getTime(), "yyyyMMdd") <= 0) {
                cBirth.add(Calendar.YEAR, 1);
                addYear++;
            }
            return new String[]{String.valueOf(addYear-1),"1"};//返回岁
        } 

        cBirth.setTime(birthday);//日期还原
        cBirth.add(Calendar.MONTH, 1);
        if (compareDate(cBirth.getTime(), cDate.getTime(), "yyyyMMdd") <= 0) { // 大于一个月，返回月
            cBirth.setTime(birthday);//日期还原
            int addMonth = 0;
            while (compareDate(cBirth.getTime(), cDate.getTime(), "yyyyMMdd") <= 0) {
                cBirth.add(Calendar.MONTH, 1);
                addMonth++;
            }
            return new String[]{String.valueOf(addMonth-1),"2"};//返回月
        }
        
        cBirth.setTime(birthday);//日期还原
        int addDay = 0;
        while (compareDate(cBirth.getTime(), cDate.getTime(), "yyyyMMdd") <= 0) {
            cBirth.add(Calendar.DAY_OF_YEAR, 1);
            addDay++;
        }
        return new String[]{String.valueOf(addDay-1),"3"}; //返回天
    }
    
    /**
     * 比较日期
     * @param d1 
     * @param d2 
     * @return 返回比较结果
     */
    public static int compareDate(Date d1, Date d2, String mask) {
        return formatDate(d1, mask).compareTo(formatDate(d2, mask));
    }
    
    /**
     * 根据日期获取日期的年份
     */
    public static String getYear(Date date){
    	String year="";
    	Calendar cal=Calendar.getInstance();
    	if(date!=null){
    		cal.setTime(date);
    		year=StringUtils.ObjectToString(cal.get(Calendar.YEAR));
    	}
    	return year;
    }
    
    /**
     * 根据日期获取日期的上一年份
     */
    public static String  getLastYear(Date date) {
        Calendar c = Calendar.getInstance();//获得一个日历的实例   
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
        String year="";
        if(date!=null){
    		c.setTime(date);
    		c.add(Calendar.YEAR, -1);
    		year=StringUtils.ObjectToString(c.get(Calendar.YEAR));
    	}
        
        return year;
	}
    
    /**
     * 根据日期获取日期的业务年份（比如：2017-10-01 ~ 2018-09-30 业务年度为2018）
     */
    public static String  getBusinessYear(Date date) { 
    	String businessYear="";
    	if(date!=null){
    		String dateStr=dateToString(date);
    		String year=dateStr.substring(0, 4);
    		if(dateStr.compareTo(year+"-10-01")>=0){
    			businessYear=""+(Integer.parseInt(year)+1);
    		}else{
    			businessYear=year;
    		}
    	}
    	return businessYear;
    	 
	}
    
    /**
     * 根据日期获取日期的月份
     */
    public static String getMonth(Date date){
    	String month="";
    	Calendar cal=Calendar.getInstance();
    	if(date!=null){
    		cal.setTime(date);
    		month=StringUtils.ObjectToString(cal.get(Calendar.MONTH)+1);
    	}
    	return month;
    }
    
    /**
     * 根据日期获取日期的当前日
     */
    public static String getDay(Date date){
    	String day="";
    	Calendar cal=Calendar.getInstance();
    	if(date!=null){
    		cal.setTime(date);
    		day=StringUtils.ObjectToString(cal.get(Calendar.DAY_OF_MONTH));
    	}
    	return day;
    }

    /**
     * 根据身份证获得生日
     */
    public static Date getCsrqFromSfz(String sfz) {
        String csrq = null;
        if (sfz == null) {
            return null;
        }
        else if (sfz.length() == 18) {
            csrq = sfz.substring(6, 14);
        }
        else if (sfz.length() == 15) {
            csrq = "19" + sfz.substring(6, 12);
        }
        else {
            return null;
        }
        return parseToDate(csrq, "yyyyMMdd");
    }

	/**
	 * 获取闰年、平年2月份的天数
	 * @param year
	 * @return
	 */
	public static int getMonthDays(String year) {
		int year1 = Integer.parseInt(year);
		Calendar c = Calendar.getInstance();
		c.set(year1, 2, 1);// year年的3月1日
		c.add(Calendar.DAY_OF_MONTH, -1);//将3月1日往左偏移一天结果是2月的天数
		return c.get(Calendar.DAY_OF_MONTH);
	}
}
