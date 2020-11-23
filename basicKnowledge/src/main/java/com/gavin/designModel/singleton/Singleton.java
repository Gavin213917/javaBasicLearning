package com.gavin.designModel.singleton;

/**
 *
 * 单列默认：（懒汉模式 ，饿汉模式，登记模式）
 * 格式：
 * 1：构造函数私有化
 * 2:公开的方法，返回当前实例的方法(static)的
 *
 * 饿汉单利模式:
 * 在类加载时就完成了初始化，所以类加载较慢，但获取对象的速度快
 */
public class Singleton {
    //懒汉式--线程不安全
//    private static Singleton instance;
//    private Singleton (){}
//
//    public static Singleton getInstance() {
//        if (instance == null) {
//            instance = new Singleton();
//        }
//        return instance;
//    }
    //懒汉式--线程安全，这种写法能够在多线程中很好的工作，而且看起来它也具备很好的lazy loading，但是，遗憾的是，效率很低，99%情况下不需要同步。
    private static Singleton instance;
    private Singleton (){}
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
