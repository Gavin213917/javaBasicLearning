package com.gavin.lambda.stream;

/**
 * @PackageName:com.liskov.stream
 * @ClassName:Person
 * @Description:
 * @Author: gaoming
 * @Date:2021/1/26 16:59
 * @Version 1.0
 */
public class Person {
    /**
     * 姓名
     **/
    private String name;

    /**
     * 薪资
     **/
    private int salary;

    /**
     * 年龄
     **/
    private int age;

    /**
     * 性别
     **/
    private String sex;

    /**
     * 地区
     **/
    private String area;


    public Person(String name, int salary, int age, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.age = age;
        this.sex = sex;
        this.area = area;
    }

    public Person(String name, int salary, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.sex = sex;
        this.area = area;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
