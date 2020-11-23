package com.gavin.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.gavin.string.StringUtils;

/**
 * 〈一句话功能简述〉<br> 
 * 〈获得字符串首个字符的开头字母〉
 *
 * @author gavin
 * @create 2019/3/28
 * @since 1.0.0
 */
public class TmPinyinUtil {
	/**
	 * 将中文转换成汉语拼音   true 转换成全拼，false 为带空格的全拼
	 * @Title:CNToPinyin
	 * @author:Gavin  
	 * @date: 2019年5月22日上午8:52:25 
	 * @Description:TODO    
	 * @version 1.0
	 */
	public static String CNToPinyin(String chinese,boolean mark){
        char[] t1 = null;
        t1=chinese.toCharArray();
        String[] t2 = new String[t1.length];
        HanyuPinyinOutputFormat t3 = new HanyuPinyinOutputFormat();
        t3.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        t3.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        t3.setVCharType(HanyuPinyinVCharType.WITH_V);
        String t4="";
        int t0=t1.length;
        try {
            for (int i=0;i<t0;i++)
            {
                //判断是否为汉字字符
                if(java.lang.Character.toString(t1[i]).matches("[\\u4E00-\\u9FA5]+"))
                {
                    t2 = PinyinHelper.toHanyuPinyinStringArray(t1[i], t3);
                    t4+=t2[0]+(mark?"":" ");
                }
                else
                    t4+=java.lang.Character.toString(t1[i]);
            }
            return t4;
        }
        catch (BadHanyuPinyinOutputFormatCombination e1) {
            e1.printStackTrace();
        }
        return t4;
    }

    /**
     * 将字符串转换成日期
     * @Title:getYMD
     * @author:Gavin  
     * @date: 2019年5月22日上午8:53:32 
     * @Description:TODO    
     * @version 1.0
     */
    public static String getYMD(String pattern) {
        return new SimpleDateFormat(pattern).format(new Date());
    }

    /**
     * 得到拼音的首字母
     * @Title:getPinYinHeadChar
     * @author:Gavin  
     * @date: 2019年5月22日上午8:53:52 
     * @Description:TODO    
     * @version 1.0
     */
    public static String getPinYinHeadChar(String str) {
        String convert = "";
        for (int j = 0; j < str.length(); j++) {
            char word = str.charAt(j);
            String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(word);
            if (pinyinArray != null) {
                convert += pinyinArray[0].charAt(0);
            }else {
                convert += word;
            }
        }
        return convert;
    }

    public static void getpath(){
        System.out.println(TmPinyinUtil.class.getResource("/"));
    }

   /**
    * 随机产生Title
    * @Title:getRandomTitle
    * @author:Gavin  
    * @date: 2019年5月22日上午8:54:37 
    * @Description:TODO    
    * @version 1.0
    */
    public static String getRandomTitle(String title){
        String content = getPinYinHeadChar(title).replaceAll("\\|<|>|\\?|\\*|:|/|\\|", "").replaceAll("[^0-9]|[^a-zA-Z]", "");
        String before = "";
        String after = "";
        if(content.length()>5){
            before = getYMD("hh")+content.substring(0,3)+getYMD("MM");
            after = getYMD("mm")+content.substring(3,4)+getYMD("yy")+getYMD("ss")+content.substring(4)+getYMD("dd");
            return before+after+StringUtils.getRandomString(5);
        }else{
            return  getYMD("yy")+getYMD("hh")+getYMD("mm")+content+getYMD("MMdd")+getYMD("ss")+StringUtils.getRandomString(10);
        }
    }

    
    /**
     * 测试函数
     * @Title:main
     * @author:Gavin  
     * @date: 2019年5月22日上午8:54:51 
     * @Description:TODO    
     * @version 1.0
     */
    public static void main(String[] args) {
        //String content = "查询人民币及外币的各种类型的储蓄存款在每个银行的存款利率以及起存金额。 操作步骤: “币种”可选择人民币、美元等各个币种;“类型”可选择“活期”、“定期...";
        //String content = "中华人民共和国";
        String content = "叶青";
        System.out.println(CNToPinyin(content,true));
        System.out.println(CNToPinyin(content,false));
        System.out.println(getPinYinHeadChar(content));

//        System.out.println((int)'0');

        //有个词库--->输入法-->分词--->zhongguo
//        String test = ",sdfsdfsd56465ADFSDF";
//        System.out.println(test.replaceAll("[^0-9]|[^a-zA-Z]", ""));//全部替换成空格
    }


}