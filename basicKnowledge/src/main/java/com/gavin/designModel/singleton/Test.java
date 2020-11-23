package com.gavin.designModel.singleton;


import static com.gavin.designModel.singleton.EnumSingleton.INSTANCE;

public class Test {
    public static void main(String[] args) {
        EnumSingleton enumSingleton = INSTANCE;
        enumSingleton.whateverMethod();
    }
}
