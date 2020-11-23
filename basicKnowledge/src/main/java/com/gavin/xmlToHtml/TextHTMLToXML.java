package com.gavin.xmlToHtml;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;

import org.w3c.tidy.Tidy;

public class TextHTMLToXML {

	public static void covert(String link,String outFile) {
		URL url = null;
		try {
			url = new URL(link);
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		}
		try (
				BufferedInputStream inputStream = new BufferedInputStream(url.openStream());
				FileOutputStream outputStream = new FileOutputStream(outFile);
		){
			Tidy tidy = new Tidy();
			tidy.setXmlOut(true);
			tidy.setErrout(new PrintWriter(new FileWriter("d://error.txt"),true));
			tidy.parse(inputStream, outputStream);
		} catch (Exception e) {
		}
	}
	
	public static void main(String[] args) {
		covert("http://www.luoo.net/", "d://luoo.xml");	
		
		
	}
}
