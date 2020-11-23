package com.gavin.beanToMap;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;  
  
public class BeanToMap<K, V> {  
    private BeanToMap() {  
    }  
  
    @SuppressWarnings("unchecked")  
    public static <K, V> Map<K, V> Bean2Map(Object javaBean) {  
        Map<K, V> ret = new HashMap<K, V>();  
        try {  
            Method[] methods = javaBean.getClass().getDeclaredMethods();  
            for (Method method : methods) {  
                if (method.getName().startsWith("get")) {  
                    String field = method.getName();  
                    field = field.substring(field.indexOf("get") + 3);  
                    field = field.toLowerCase().charAt(0) + field.substring(1);  
                    Object value = method.invoke(javaBean, (Object[]) null);  
                    ret.put((K) field, (V) (null == value ? "" : value));  
                }  
            }  
        } catch (Exception e) {  
        }  
        return ret;  
    }  
      
    public static void main(String[] args) {  
        Person person = new Person();  
        person.setAge(11);  
        person.setUsername("张珊");  
        System.out.println(Bean2Map(person));  
    }  
}  