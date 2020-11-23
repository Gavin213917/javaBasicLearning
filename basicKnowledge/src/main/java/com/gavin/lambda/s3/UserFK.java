package com.gavin.lambda.s3;

import com.gavin.lambda.jdbc.User;

@FunctionalInterface
public interface UserFK {

	User test(String username, String password);
}
