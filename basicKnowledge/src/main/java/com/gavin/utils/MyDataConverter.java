package com.gavin.utils;

import org.apache.commons.beanutils.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MyDataConverter implements Converter {

    private String pattern;

    public MyDataConverter(String pattern) {
        this.pattern = pattern;
    }

    @Override
    public Object convert(Class type, Object value) {

        String dateStr = (String)value;
        SimpleDateFormat spdt = new SimpleDateFormat(pattern);
        try {
            Date date = spdt.parse(dateStr);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

}
