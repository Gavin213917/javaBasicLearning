package com.gavin.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
/**
 * @Description TODO
 * @Author admin
 * @Date 2020/9/14 11:02
 */
public class CombineBeans {
    public static   <T> T combineBeans(T sourceBean,T targetBean ){
        Class sourceBeanClass = sourceBean.getClass();
        Class targetBeanClass = targetBean.getClass();
        Field[] sourceFields = sourceBeanClass.getDeclaredFields();
        Field[] targetFields = targetBeanClass.getDeclaredFields();

        for(int i=0; i<sourceFields.length; i++){
            Field sourceField = sourceFields[i];
            if(Modifier.isStatic(sourceField.getModifiers())){
                continue;
            }
            Field targetField = targetFields[i];
            if(Modifier.isStatic(targetField.getModifiers())){
                continue;
            }
            sourceField.setAccessible(true);
            targetField.setAccessible(true);
            try {
                if( (targetField.get(targetBean) != null)){
                    sourceField.set(sourceBean,targetField.get(targetBean));
                }
            } catch (IllegalArgumentException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return sourceBean;
    }

}
