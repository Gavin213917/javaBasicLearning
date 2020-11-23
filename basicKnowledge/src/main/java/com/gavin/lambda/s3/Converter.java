package com.gavin.lambda.s3;

@FunctionalInterface
public interface Converter {

	Integer convert(String from);
}
