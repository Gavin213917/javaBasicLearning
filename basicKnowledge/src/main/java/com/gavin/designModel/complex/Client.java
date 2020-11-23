package com.gavin.designModel.complex;

public class Client {

	public static void main(String[] args) {
		
		AbstractFactory intelFactory = new IntelFactory();
		ComputerEngineer computerEngineer = new ComputerEngineer();
		computerEngineer.makeComputer(intelFactory, 755,755);
		
		System.out.println("=================");
		
		AbstractFactory amdFactory = new AMDFactory();
		ComputerEngineer computerEngineer2 = new ComputerEngineer();
		computerEngineer2.makeComputer(amdFactory, 755,755);
		
		
	}
}
