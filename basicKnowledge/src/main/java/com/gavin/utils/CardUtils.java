package com.gavin.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wxk
 * @version 1.0
 * @date 2020/4/27 9:39
 * @intro 根据身份证号获取性别和年龄
 */
public class CardUtils {

    private CardUtils(){}


    /**
     *  根据身份证获取年龄
     * @param idCard
     * @return
     * @throws Exception
     */
    public static int getAgeFromIdCard(String idCard) throws Exception {
        int len = idCard.length();
        if(18 == len){
            Map<String, Object> map = getCarInfo(idCard);
            return map.get("age") == null ? 0 : (int) map.get("age");
        }else if(15 == len){
            Map<String, Object> map = getCarInfo15W(idCard);
            return map.get("age") == null ? 0 : (int) map.get("age");
        }else {
            return 0;
        }

    }



    /**
     *  根据身份证获取性别
     * @param idCard
     * @return
     * @throws Exception
     */
    public static String getGenderFromIdCard(String idCard) throws Exception {
        int len = idCard.length();
        if(18 == len){
            Map<String, Object> map = getCarInfo(idCard);
            return map.get("sex") == null ? "" : (String) map.get("sex");
        }else if(15 == len){
            Map<String, Object> map = getCarInfo15W(idCard);
            return map.get("sex") == null ? "" : (String) map.get("sex");
        }else {
            return "";
        }

    }


    /**
     *  根据身份证获取出生日期
     * @param idCard
     * @return
     * @throws Exception
     */
    public static String getBirthFromIdCard(String idCard) throws Exception {
        int len = idCard.length();
        if(18 == len){
            Map<String, Object> map = getCarInfo(idCard);
            return map.get("birth") == null ? "" : (String) map.get("birth");
        }else if(15 == len){
            Map<String, Object> map = getCarInfo15W(idCard);
            return map.get("birth") == null ? "" : (String) map.get("birth");
        }else {
            return "";
        }

    }



    /**
     * 根据身份证的号码算出当前身份证持有者的性别和年龄 出生日期 18位身份证
     *
     * @param CardCode
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getCarInfo(String CardCode) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        // 得到年份
        String year = CardCode.substring(6).substring(0, 4);
        // 得到月份
        String yue = CardCode.substring(10).substring(0, 2);
        //得到日
        String day = CardCode.substring(12).substring(0, 2);
        String birth = year + "-" + yue + "-" + day;
        String sex;
        // 判断性别
        if (Integer.parseInt(CardCode.substring(16).substring(0, 1)) % 2 == 0) {
            sex = "女";
        } else {
            sex = "男";
        }
        // 得到当前的系统时间
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        // 当前年份
        String fyear = format.format(date).substring(0, 4);
        // 月份
        String fyue = format.format(date).substring(5, 7);
        String fday = format.format(date).substring(8, 10);
        int age = 0;
        // 当前月份大于用户出身的月份表示已过生
        if (Integer.parseInt(yue) <= Integer.parseInt(fyue)) {
            age = Integer.parseInt(fyear) - Integer.parseInt(year) + 1;
        } else {// 当前用户还没过生
            age = Integer.parseInt(fyear) - Integer.parseInt(year);
        }
        map.put("sex", sex);
        map.put("age", age);
        map.put("birth", birth);
        return map;
    }

    /**
     * 根据身份证的号码算出当前身份证持有者的性别和年龄 出生日期 15位身份证
     *
     * @param card
     * @return
     * @throws Exception
     */
    public static Map<String, Object> getCarInfo15W(String card)
            throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        // 年份
        String uyear = "19" + card.substring(6, 8);
        // 月份
        String uyue = card.substring(8, 10);
        //日
        String uday = card.substring(10, 12);
        String birth = uyear + "-" + uyue + "-" + uday;
        // 用户的性别
        String usex = card.substring(14, 15);
        String sex;
        if (Integer.parseInt(usex) % 2 == 0) {
            sex = "女";
        } else {
            sex = "男";
        }
        // 得到当前的系统时间
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        // 当前年份
        String fyear = format.format(date).substring(0, 4);
        // 月份
        String fyue = format.format(date).substring(5, 7);
        String fday = format.format(date).substring(8, 10);
        int age = 0;
        // 当前月份大于用户出身的月份表示已过生
        if (Integer.parseInt(uyue) <= Integer.parseInt(fyue)) {
            age = Integer.parseInt(fyear) - Integer.parseInt(uyear) + 1;
        } else {
            // 当前用户还没过生
            age = Integer.parseInt(fyear) - Integer.parseInt(uyear);
        }
        map.put("sex", sex);
        map.put("age", age);
        map.put("birth", birth);
        return map;
    }

    public static void main(String[] args) throws Exception {
        Map<String, Object> carInfo = getCarInfo("422128195007201804");
        System.out.println(carInfo.get("age"));
        System.out.println(carInfo.get("sex"));
        System.out.println(carInfo.get("birth"));
    }
}
