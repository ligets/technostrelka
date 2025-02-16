package com.srt.Accounts.utils;

public class RandomStringUtil {
    private final static String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String getRandomString(int size) {
        StringBuilder randomString = new StringBuilder();
        for (int i = 0; i < size; ++i) {
            int randomIndex = (int) (Math.random() * CHARACTERS.length());
            randomString.append(CHARACTERS.charAt(randomIndex));
        }
        return randomString.toString();
    }
}
