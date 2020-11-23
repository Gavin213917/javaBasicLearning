package com.gavin.annotation;

public class UserController {

	@RequestMapping(value={"/user","/user/index"},method=RequestMethod.POST)
	public String index(){
		
		return "success";
	}
}
