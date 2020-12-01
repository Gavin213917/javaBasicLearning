package com.gavin.date;

import java.util.Calendar;
import java.util.Date;

public class CalNd {
    public static void main(String[] args) {

    }

    /**
     * 计算当前业务年 季度中的开始日期、结束日期
     * @param nf
     * @param jd
     * @param flag true 开始日期 false 结束日期
     * @return
     */
    public String getJdStartAndEnd(String nf,String jd,boolean flag){
        String jdrq="";
        String ywnd="";
        //业务年第一季度 6-8
        if(ConstantsUtils.JHB_BBJDLX_FQ.equals(jd)){
            ywnd=String.valueOf(Integer.parseInt(nf));
            if(flag){
                jdrq=ywnd+"-06-01";
            }else {
                jdrq=ywnd+"-08-31";
            }
        }else if(ConstantsUtils.JHB_BBJDLX_SQ.equals(jd)){
            ywnd=String.valueOf(Integer.parseInt(nf));
            if(flag){
                jdrq=ywnd+"-09-01";
            }else {
                jdrq=ywnd+"-11-30";
            }
        }else if(ConstantsUtils.JHB_BBJDLX_TQ.equals(jd)){
            if(flag){
                ywnd=String.valueOf(Integer.parseInt(nf));
                jdrq=ywnd+"-12-01";
            }else {
                ywnd=String.valueOf(Integer.parseInt(nf)+1);
                jdrq=ywnd+"-02-"+getMonthDays(nf);
            }
        }else if(ConstantsUtils.JHB_BBJDLX_FTQ.equals(jd)){
            ywnd=String.valueOf(Integer.parseInt(nf)-1);
            if(flag){
                jdrq=ywnd+"-03-01";
            }else {
                jdrq=ywnd+"-05-31";
            }
        }

        return jdrq;
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


    /**
     * 计算当前业务年季度 （例如2018.6至2018.8 为第1季度）
     * @param date
     * @return
     */
    public  String  getSeason(Date date) {
        String season = "";
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int month = c.get(Calendar.MONTH);
        switch (month) {
            case Calendar.JUNE:
            case Calendar.JULY:
            case Calendar.AUGUST:
                season = ConstantsUtils.JHB_BBJDLX_FQ;//第一季度
                break;
            case Calendar.SEPTEMBER:
            case Calendar.OCTOBER:
            case Calendar.NOVEMBER:
                season = ConstantsUtils.JHB_BBJDLX_SQ;//第二季度
                break;
            case Calendar.DECEMBER:
            case Calendar.JANUARY:
            case Calendar.FEBRUARY:
                season = ConstantsUtils.JHB_BBJDLX_TQ;//第三季度
                break;
            case Calendar.MARCH:
            case Calendar.APRIL:
            case Calendar.MAY:
                season = ConstantsUtils.JHB_BBJDLX_FTQ;//第四季度
                break;
            default:
                break;
        }
        return season;
    }
    /**
     * 计算当前业务年度
     * @param date
     * @return
     */
    public static String getYwnd(Date date){
        String ywnd="";
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int month = c.get(Calendar.MONTH);
        int year = c.get(Calendar.YEAR);

        switch (month) {
            case Calendar.JUNE:
            case Calendar.JULY:
            case Calendar.AUGUST:
            case Calendar.SEPTEMBER:
            case Calendar.OCTOBER:
            case Calendar.NOVEMBER:
            case Calendar.DECEMBER:
                ywnd=String.valueOf(year);
                break;
            default:
                ywnd=String.valueOf(year-1);
                break;
        }
        return ywnd;
    }
}
