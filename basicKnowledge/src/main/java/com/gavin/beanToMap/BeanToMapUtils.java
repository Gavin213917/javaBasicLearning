package com.gavin.beanToMap;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.Map;

import com.gavin.date.KeKeDateConverter;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;

public class BeanToMapUtils {
	
	 /** 
     *  
     *  
     * Map转换层Bean，使用泛型免去了类型转换的麻烦。 
     * @param <T> 
     * @param map   
     * @param class1 
     * @return 
     */  
    public static <T> T map2Bean(Map<String, String> map, Class<T> class1) {  
        T bean = null;  
        try {  
            bean = class1.newInstance();  
            BeanUtils.populate(bean, map);  
        } catch (InstantiationException e) {  
            e.printStackTrace();  
        } catch (IllegalAccessException e) {  
            e.printStackTrace();  
        } catch (InvocationTargetException e) {  
            e.printStackTrace();  
        }  
        return bean;  
    }  

	public static void main(String[] args) {
		try {
			Person person = new Person();
			person.setId(1);
			person.setUsername("可可");
			person.setBirthday(new Date());
			person.setAge(30);
			person.setAddress("湖南長沙");
			//Bean--->Map
			ConvertUtils.register(new KeKeDateConverter(), java.util.Date.class);
			ConvertUtils.register(new KeKeDateConverter(), java.lang.String.class);  
			Map<String, String> map = BeanUtils.describe(person);//具有格式的--long /2015-12-12 12:12
			System.out.println(map);
			map.put("username", "小星星");
			//Map-Bean
			Person person2 = map2Bean(map, Person.class);
			System.out.println(person2.getUsername());
			System.out.println(person2.getBirthday());
			
			//bean--json
			String jsonString = JSONUtil.serialize(person);
			System.out.println(jsonString);
		} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		
		//json---map---bean--xml
		//json-lib.jar
		//G:\Java基础班视频\Java杂项\json\json-lib-2.4-jdk15.jar 谷歌 
		//G:\Java基础班视频\Java杂项\json\xstream-1.4.8.jar
		//G:\Java基础班视频\Java杂项\json\struts2-json-plugin-2.3.15.1.jar
		//fastjson gjson很多
	}

}