/**
 *
 */
package com.gavin.date;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 日期工具类, 继承org.apache.commons.lang.time.DateUtils类
 *
 * @version 2014-4-15
 */
public class DateUtils extends org.apache.commons.lang3.time.DateUtils {

    public static String[] parsePatterns = {"yyyy-MM-dd",
            "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy-MM", "yyyy/MM/dd",
            "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm", "yyyy/MM", "yyyy.MM.dd",
            "yyyy.MM.dd HH:mm:ss", "yyyy.MM.dd HH:mm", "yyyy.MM"};
    public static final String DATE_FORMART_HOR_SS = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMART_HOR = "yyyy-MM-dd";

    /**
     * 得到当前日期字符串 格式（yyyy-MM-dd）
     */
    public static String getDate() {
        return getDate("yyyy-MM-dd");
    }

    /**
     * 得到当前日期字符串 格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
     */
    public static String getDate(String pattern) {
        return DateFormatUtils.format(new Date(), pattern);
    }

    /**
     * 得到下个月日期字符串 格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
     */
    public static String getNextMonthDate() {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.MONTH, 1);
        return DateFormatUtils.format(c.getTime(), "yyyy-MM-dd");
    }

    /**
     * 得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
     */
    public static String formatDate(Date date, Object... pattern) {
        if (date == null) {
            return "";
        }
        String formatDate = null;
        if (pattern != null && pattern.length > 0) {
            formatDate = DateFormatUtils.format(date, pattern[0].toString());
        } else {
            formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
        }
        return formatDate;
    }

    /**
     * 得到日期时间字符串，转换格式（yyyy-MM-dd HH:mm:ss）
     */
    public static String formatDateTime(Date date) {
        return formatDate(date, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 得到当前时间字符串 格式（HH:mm:ss）
     */
    public static String getTime() {
        return formatDate(new Date(), "HH:mm:ss");
    }

    /**
     * 得到当前日期和时间字符串 格式（yyyy-MM-dd HH:mm:ss）
     */
    public static String getDateTime() {
        return formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 得到当前年份字符串 格式（yyyy）
     */
    public static String getYear() {
        return formatDate(new Date(), "yyyy");
    }

    /**
     * 得到当前月份字符串 格式（MM）
     */
    public static String getMonth() {
        return formatDate(new Date(), "MM");
    }

    /**
     * 得到当天字符串 格式（dd）
     */
    public static String getDay() {
        return formatDate(new Date(), "dd");
    }

    /**
     * 得到当前星期字符串 格式（E）星期几
     */
    public static String getWeek() {
        return formatDate(new Date(), "E");
    }

    /**
     * 日期型字符串转化为日期 格式 { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm",
     * "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm", "yyyy.MM.dd",
     * "yyyy.MM.dd HH:mm:ss", "yyyy.MM.dd HH:mm" }
     */
    public static Date parseDate(Object str) {
        if (str == null) {
            return null;
        }
        try {
            return parseDate(str.toString(), parsePatterns);
        } catch (ParseException e) {
            return null;
        }
    }

    public static String formatDate(String str) {
        SimpleDateFormat sf1 = new SimpleDateFormat("yyyyMMdd");
        SimpleDateFormat sf2 = new SimpleDateFormat("yyyy-MM-dd");
        String sfstr = "";
        try {
            sfstr = sf2.format(sf1.parse(str));
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return sfstr;
    }

    /**
     * 获取过去的天数
     *
     * @param date
     * @return
     */
    public static long pastDays(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (24 * 60 * 60 * 1000);
    }

    /**
     * 计算传入毫秒数，*日*小时*分钟*秒
     *
     * @param mss
     * @return
     */
    public static String formatDuring(Long mss) {
        if (mss == null) {
            return "";
        }
        if (mss == 0) {
            return "0";
        }
        StringBuffer buffer = new StringBuffer(20);
        long days = mss / (1000 * 60 * 60 * 24);
        if (days > 0) {
            buffer.append(days + "天");
        }
        long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
        if (hours > 0) {
            buffer.append(hours + "时");
        }
        long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
        if (minutes > 0) {
            buffer.append(minutes + "分");
        }
        long seconds = (mss % (1000 * 60)) / 1000;
        if (seconds > 0) {
            buffer.append(seconds + "秒");
        }
        long m = mss % 1000;
        if (m > 0) {
            buffer.append(m + "毫秒");
        }
        return buffer.toString();
    }

    public static Integer getAge(Date birthdate) {
        if (birthdate != null) {
            return (int) (pastDays(birthdate) / 365);
        }
        return null;
    }

    /**
     * 获取过去的小时
     *
     * @param date
     * @return
     */
    public static long pastHour(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (60 * 60 * 1000);
    }

    /**
     * 获取过去的分钟
     *
     * @param date
     * @return
     */
    public static long pastMinutes(Date date) {
        long t = new Date().getTime() - date.getTime();
        return t / (60 * 1000);
    }

    /**
     * 转换为时间（天,时:分:秒.毫秒）
     *
     * @param timeMillis
     * @return
     */
    public static String formatDateTime(long timeMillis) {
        long day = timeMillis / (24 * 60 * 60 * 1000);
        long hour = (timeMillis / (60 * 60 * 1000) - day * 24);
        long min = ((timeMillis / (60 * 1000)) - day * 24 * 60 - hour * 60);
        long s = (timeMillis / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
        long sss = (timeMillis - day * 24 * 60 * 60 * 1000 - hour * 60 * 60
                * 1000 - min * 60 * 1000 - s * 1000);
        return (day > 0 ? day + "," : "") + hour + ":" + min + ":" + s + "."
                + sss;
    }

    /**
     * 获取两个日期之间的天数
     *
     * @param before
     * @param after
     * @return
     */
    public static double getDistanceOfTwoDate(Date before, Date after) {
        long beforeTime = before.getTime();
        long afterTime = after.getTime();
        return (afterTime - beforeTime) / (1000 * 60 * 60 * 24);
    }

    /**
     * 计算两个日期之间相差的天数
     *
     * @param smdate 较小的时间
     * @param bdate  较大的时间
     * @return 相差天数
     * @throws ParseException
     */
    public static int daysBetween(Date smdate, Date bdate) {
        smdate = parseDate(formatDate(smdate, "yyyy-MM-dd"));
        bdate = parseDate(formatDate(bdate, "yyyy-MM-dd"));
        Calendar cal = Calendar.getInstance();
        cal.setTime(smdate);
        long time1 = cal.getTimeInMillis();
        cal.setTime(bdate);
        long time2 = cal.getTimeInMillis();
        long between_days = (time2 - time1) / (1000 * 3600 * 24);

        return Integer.parseInt(String.valueOf(between_days));
    }

    /**
     * 比较时间大小
     *
     * @param sdate
     * @param edate
     * @return
     */
    public static String compareDays(Date sdate, Date edate) {

        long s = sdate.getTime() - new Date().getTime();
        long e = new Date().getTime() - edate.getTime();
        if (s > 0) {
            return "未开始";
        }
        if (e > 0) {
            return "已过期";
        }
        if (s <= 0 && e <= 0) {
            return "进行中";
        }
        return null;
    }

    /**
     * 比较时间大小
     *
     * @param sdate
     * @param edate
     * @return
     */
    public static int compareDateTime(Date sdate, Date edate) {

        long s = sdate.getTime() - edate.getTime();
        if (s > 0) {
            return 1;
        }
        if (s < 0) {
            return -1;
        }
        if (s == 0) {
            return 0;
        }
        return 0;
    }

    /**
     * 比较两个日期的大小
     *
     * @param d1
     * @param d2
     * @return result>0 :d1晚于d2,result<0 :d1早于d2
     */
    public static int compare(Date d1, Date d2) {
        String str1 = formatDate(d1, "yyyy-MM-dd");
        String str2 = formatDate(d2, "yyyy-MM-dd");

        int result = str1.compareTo(str2);

        return result;
    }

    /**
     * 比较两个日期的大小
     *
     * @param d1
     * @param d2
     * @return result>0 :d1晚于d2,result<0 :d1早于d2
     */
    public static int compareTime(Date d1, Date d2) {
        String str1 = formatDate(d1, "yyyy-MM-dd HH:mm:ss");
        String str2 = formatDate(d2, "yyyy-MM-dd HH:mm:ss");

        int result = str1.compareTo(str2);

        return result;
    }

    /**
     * 获取当前年度的第一天
     *
     * @param pattern
     * @return
     */
    public static String getCurrentYearFirstDate(String pattern) {
        return getYearFirstDate(Integer.valueOf(getYear()), pattern);
    }

    /**
     * 获取当前年度的最后一天
     *
     * @param pattern
     * @return
     */
    public static String getCurrentYearLastDate(String pattern) {
        return getYearLastDate(Integer.valueOf(getYear()), pattern);
    }

    /**
     * 获取某年度的第一天
     *
     * @param pattern
     * @return
     */
    public static String getYearFirstDate(int year, String pattern) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        Date currYearFirst = calendar.getTime();
        return DateFormatUtils.format(currYearFirst, pattern);
    }

    /**
     * 获取某年度的最后一天
     *
     * @param pattern
     * @return
     */
    public static String getYearLastDate(int year, String pattern) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        Date currYearLast = calendar.getTime();
        return DateFormatUtils.format(currYearLast, pattern);
    }

    /**
     * 查询当前日期前(后)x天的日期
     *
     * @param date 当前日期
     * @param day  天数（如果day数为负数,说明是此日期前的天数）
     * @return yyyy-MM-dd
     */
    public static String beforNumberDay(Date date, int day) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_YEAR, day);
        return new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
    }

    /**
     * 查询上个月（上上个月。。。)的第一天和最后一天
     *
     * @param num
     * @return
     */
    public static String findLastMonth(int num) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");

        Calendar cal = Calendar.getInstance();
        GregorianCalendar gcLast = (GregorianCalendar) Calendar.getInstance();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        calendar.add(Calendar.MONTH, num);   //-1：表示上个月  -2：表示上上个月
        Date theDate = calendar.getTime();
        gcLast.setTime(theDate);
        gcLast.set(Calendar.DAY_OF_MONTH, 1);
        String day_first_prevM = df.format(gcLast.getTime());
        StringBuffer str = new StringBuffer().append(day_first_prevM);
        day_first_prevM = str.toString();
        return day_first_prevM;
    }

    /**
     * 获取本月的第一天（或者当前日期）
     *
     * @return
     */
    public static String currDate(String current) {
        String currdate = "";
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        if ("1".equals(current)) {    //current=1:表示获取本月的第一天，否则获取当前日期
            cal.set(Calendar.DAY_OF_MONTH, 1);
        }
        currdate = new SimpleDateFormat("yyyy-MM").format(cal.getTime());
        return currdate;
    }

    /**
     * 获取指定日期是星期几
     * 参数为null时表示获取当前日期是星期几
     *
     * @param date
     * @return
     */
    public static String getWeekOfDate(Date date) {
        String[] weekOfDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar calendar = Calendar.getInstance();
        if (date != null) {
            calendar.setTime(date);
        }
        int w = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekOfDays[w];
    }

    /**
     * 获取指定日期是周几
     * 参数为null时表示获取当前日期是周几
     *
     * @param date
     * @return
     */
    public static String getWeekOfDate2(Date date) {
        String[] weekOfDays = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};
        Calendar calendar = Calendar.getInstance();
        if (date != null) {
            calendar.setTime(date);
        }
        int w = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekOfDays[w];
    }

    public static List<Date> getDaysBetweenTwoDays(Date start, Date end) {
        if (start == null || end == null || compare(start, end) > 0) {
            return null;
        }

        // 返回的日期集合
        List<Date> days = new ArrayList<Date>();

        Calendar tempStart = Calendar.getInstance();
        tempStart.setTime(start);

        Calendar tempEnd = Calendar.getInstance();
        tempEnd.setTime(end);
        tempEnd.add(Calendar.DATE, +1);// 日期加1(包含结束)
        while (tempStart.before(tempEnd)) {
            days.add(tempStart.getTime());
            tempStart.add(Calendar.DAY_OF_YEAR, 1);
        }
        return days;
    }

    public static List<String> getDaysBetweenTwoDaysStr(Date start, Date end, String format) {
        if (start == null || end == null || compare(start, end) > 0) {
            return null;
        }

        // 返回的日期集合
        List<String> days = new ArrayList<String>();

        Calendar tempStart = Calendar.getInstance();
        tempStart.setTime(start);

        Calendar tempEnd = Calendar.getInstance();
        tempEnd.setTime(end);
        tempEnd.add(Calendar.DATE, +1);// 日期加1(包含结束)
        while (tempStart.before(tempEnd)) {
            if (StringUtils.isNotBlank(format))
                days.add(formatDate(tempStart.getTime(), format));
            else
                days.add(formatDate(tempStart.getTime()));
            tempStart.add(Calendar.DAY_OF_YEAR, 1);
        }
        return days;
    }

    public static List<String> getDateList(String startRq, String endRq, String format) throws ParseException {
        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = dateFormat1.parse(startRq);
        Date date2 = dateFormat1.parse(endRq);
        return DateUtils.getDaysBetweenTwoDaysStr(date1, date2, format);
    }


    /**
     * 根据参数 获得参数所在周的 所有天  周一到周日
     *
     * @param date
     * @return
     */
    public static List<Date> getDaysInWeek(Date date) {
        if (date == null) {
            return null;
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        // 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
        if (1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        // System.out.println("要计算日期为:" + sdf.format(cal.getTime())); // 输出要计算日期
        // 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        // 获得当前日期是一个星期的第几天
        int day = cal.get(Calendar.DAY_OF_WEEK);
        // 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);
        Date start = cal.getTime();
        // System.out.println("所在周星期一的日期：" + imptimeBegin);
        cal.add(Calendar.DATE, 6);
        Date end = cal.getTime();
        return getDaysBetweenTwoDays(start, end);
    }


    /**
     * 获取后几年
     *
     * @param nowDate
     * @return
     */
    public static Date getNextYear(Date nowDate, int howyear) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.YEAR, howyear);
        return cal.getTime();
    }

    /**
     * 获取后几月
     *
     * @param nowDate
     * @return
     */
    public static Date getNextMonth(Date nowDate, int howyear) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(nowDate);
        cal.add(Calendar.MONTH, howyear);
        return cal.getTime();
    }

    /**
     * 此方法计算时间毫秒
     *
     * @param inVal
     * @return
     */
    public static long fromDateStringToLong(String inVal) { //
        Date date = null;   //定义时间类型
        SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-mm-dd");
        try {
            date = inputFormat.parse(inVal); //将字符型转换成日期型
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date.getTime();   //返回毫秒数
    }

    /**
     * 获取某一天的起始时分秒
     *
     * @param date
     * @return
     */
    public static Date getDayStart(Date date) {
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formater2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return formater2.parse(formater.format(date) + " 00:00:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    /**
     * 获取某一天的结束时分秒
     *
     * @param date
     * @return
     */
    public static Date getDayEnd(Date date) {
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formater2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return formater2.parse(formater.format(date) + " 23:59:59");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    /**
     * 获取两个日期的拼接 一个日期 一个时间
     *
     * @param date1
     * @param date2
     * @return
     */
    public static Date getTwoDaysJoin(Date date1, Date date2) {
        SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formater2 = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat formater3 = new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");

        try {
            return formater3.parse(formater.format(date1) + formater2.format(date2));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    public static Date addDateMinut(Date date, int x) {
        if (date == null)
            return null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, x);// 24小时制
        date = cal.getTime();
        return date;

    }

    /**
     * String 转 java.sql.Timestamp
     *
     * @param strDate
     * @param dateFormat
     * @return
     * @throws ParseException
     */
    public static Date strToSqlDate(String strDate, String dateFormat) {
        if (null == dateFormat || "".equals(dateFormat) || "null".equals(dateFormat)) {
            dateFormat = DATE_FORMART_HOR_SS;
        }
        if (null == strDate || "".equals(strDate) || "null".equals(strDate)) {
            return null;
        }
        SimpleDateFormat sf = new SimpleDateFormat(dateFormat);
        Date date = null;
        try {
            if (DateUtils.isValidDate(strDate, dateFormat)) {
                date = sf.parse(strDate);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 校验日期格式是否是指定格式
     *
     * @param str
     * @param dateFormat
     * @return
     */
    public static boolean isValidDate(String str, String dateFormat) {
        if (StringUtils.isEmpty(str) || StringUtils.isEmpty(dateFormat)) {
            return false;
        }
        boolean convertSuccess = true;
        SimpleDateFormat format = new SimpleDateFormat(dateFormat);
        try {
            format.parse(str);
        } catch (ParseException e) {
            convertSuccess = false;
        }
        return convertSuccess;
    }

    /**
     * 将timestamp 转换成指定日期格式
     *
     * @param timestamp
     * @param format
     * @return
     */
    public static String getDateStr(Date timestamp, String format) {
        if (null == timestamp) {
            return "";
        }
        if (null == format || "".equals(format) || "null".equals(format)) {
            format = "yyyy-MM-dd";
        }
        DateFormat sdf = new SimpleDateFormat(format);
        try {
            return sdf.format(timestamp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 精确计算年龄
     *
     * @param birthDay
     * @return
     */
    public static int getAgeByBirthDay(Date birthDay) {
        int age = getAgeByBirthDay(birthDay, new Date());
        return age;
    }


    /**
     * 精确计算年龄
     *
     * @param birthDay
     * @param todate
     * @return
     */
    public static int getAgeByBirthDay(Date birthDay, Date todate) {
        int age = 0;
        try {
            Calendar cal = Calendar.getInstance();

            if (todate != null) {
                cal.setTime(todate);
            }

            if (cal.before(birthDay)) {
                return age;
            }
            //获取当前年月日
            int yearNow = cal.get(Calendar.YEAR);
            int monthNow = cal.get(Calendar.MONTH);
            int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);

            cal.setTime(birthDay);
            //获取出生年月日
            int yearBirth = cal.get(Calendar.YEAR);
            int monthBirth = cal.get(Calendar.MONTH);
            int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);
            //根据年计算年龄
            age = yearNow - yearBirth;
            //如果出生月份大于当前月份
            if (monthNow <= monthBirth) {
                //同一月份判断日期
                if (monthNow == monthBirth) {
                    if (dayOfMonthNow < dayOfMonthBirth) {
                        age--;
                    }
                } else {
                    age--;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return age;
    }

    /**
     * 根据输入年龄计算日期
     * 例如 29岁->当前（2019-04-29）时间范围带时分秒：1989-04-30 00:00:00 至 1990-04-29 23:59:59
     *
     * @param ageStart >= 0
     * @param ageEnd   >= 0
     * @return
     */
    public static Map<String, Date> getDateByAge(int ageStart, int ageEnd) {
        Calendar calEnd = Calendar.getInstance();
        Calendar calStart = Calendar.getInstance();
        if (ageStart >= 0) {
            calEnd.add(Calendar.YEAR, -ageStart);
        }
        if (ageEnd == 0) {
            ageEnd = 1;
        } else {
            ageEnd = ageEnd + 1;
        }
        calStart.add(Calendar.YEAR, -ageEnd);
        //精确计算年龄到天
        calStart.add(Calendar.DAY_OF_MONTH, 1);

        Map<String, Date> map = new HashMap<>();

        map.put("fromDate", getDayStart(calStart.getTime()));
        map.put("endDate", getDayEnd(calEnd.getTime()));
        return map;
    }

    public static Date getBirthday(String cardID) {
        Date returnDate = null;
        StringBuffer tempStr = null;
        if (cardID != null && cardID.trim().length() > 0) {
            if (cardID.trim().length() == 15) {
                tempStr = new StringBuffer(cardID.substring(6, 12));
                tempStr.insert(4, '-');
                tempStr.insert(2, '-');
                tempStr.insert(0, "19");
            } else if (cardID.trim().length() == 18) {
                tempStr = new StringBuffer(cardID.substring(6, 14));
                tempStr.insert(6, '-');
                tempStr.insert(4, '-');
            }
        }
        if (tempStr != null && tempStr.toString().trim().length() > 0) {
            returnDate = DateUtils.parseDate(tempStr.toString());
        }
        return returnDate;
    }


    public static String getAfterDateTime(Date date, long time, String pattern) {
        if (null == date) {
            date = new Date();
        }
        //time = 60*1000;//60秒
        Date afterDate = new Date(date.getTime() + time);//60秒后的时间
        return formatDate(afterDate, pattern);
    }
    public static Date initDateByDay(String date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(parseDate(date));
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        return calendar.getTime();
    }
    public static Date getMaxCurrentDate(String date)  {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String formatDate = format.format(parseDate(date));
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(format.parse(formatDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        cal.add(Calendar.DAY_OF_YEAR, 1);
        return new Date(cal.getTime().getTime() - 1);
    }
    /**
     * @param args
     * @throws ParseException
     */
    public static void main(String[] args) throws ParseException {
        // System.out.println(formatDate(parseDate("2010/3/6")));
        // System.out.println(getDate("yyyy年MM月dd日 E"));
        // long time = new Date().getTime()-parseDate("2012-11-19").getTime();
        // System.out.println(time/(24*60*60*1000));
        //System.out.println(formatDate("20150712"));
        System.out.println(addDateMinut(parseDate("1970-01-01 08:00:00"), 5));
    }

}
