
function operationsFactory() {
	var ops = {};
	
	ops.load = {
		token: 'L', 
		code: 0,
		executor: null,
		args: 2,
		description: 'L A B - Loads address A with value B',
	};
	ops.move = {
		token: 'M', 
		code: 1,
		executor: null,
		args: 2,
		description: 'M A B - Loads adress A with value at adress B',
	},
	ops.increase = {
		token: 'I', 
		code: 2,
		executor: null,
		args: 2,
		description: 'I A B - Adds value B to value at adress A',
	};
	ops.add = {
		token: 'A', 
		code: 3,
		executor: null,
		args: 3,
		description: 'A A B C - Sums value at adress A with value at B and stores them at adress C',
	},
	ops.decrease = {
		token: 'D', 
		code: 4,
		executor: null,
		args: 2,
		description: 'D A B - Decreases value at adress A by value B',
	};
	ops.subtract = {
		token: 'S', 
		code: 5,
		executor: null,
		args: 3,
		description: 'S A B C - Subtracts value at adress B from value at adress A and stores result at adress C',
	};
	ops.jump = {
		token : 'J' , 
		code: 6,
		executor: null,
		args: 1,
		description: 'J A - Moves PC to adress A ( code memory not "ram" memory )',
	};
	ops.go = {
		token: 'G', 
		code: 7,
		executor: null,
		args: 1,
		description: 'G A - Moves PC to adress stored at adress A',
	};
	ops.jumpZero = {
		token: 'Z', 
		code: 8,
		executor:null,
		args: 2,
		description: 'Z A B - Moves PC to adress B if value at adress A is 0',
	};
	ops.goZero = {
		token: 'F', 
		code: 9,
		executor: null,
		args: 2,
		description: 'F A B - Moves PC to adress stored at adress B if value at adress A is 0',
	};	
	ops.print = {
		token: 'P', 
		code: 10,
		executor: null,
		args: 1,
		description: 'P A - Prints character coresponding to ascii code at adress A',
	};
	ops.read = {
		token: 'R', 
		code: 11,
		executor: null,
		args:1,
		description: 'R A - Reads ascii code from keyboard and stores it at adress A',
	};
	ops.nand = {
		token: 'N', 
		code: 12,
		executor: null,
		args: 3,
		description: 'N A B C - Computes bitewise NAND between values at adresses A and B, and stores at C'
	};
	ops.end = {
		token: 'E', 
		code: 255,
		executor: null,
		args: 0,
		description: ''
	};
	ops.push = {
		token: '+',
		code:13,
		executor: null,
		args: 1,
		description: '+ A - pushes value at adress A onto the stack'
	};
	ops.pop = {
		token: '-',
		code:14,
		executor: null,
		args: 1,
		description: '- A - pops value from stack into adress A'
	};
	ops.nop = {
		token: '#',
		code:254,
		executor: null,
		args: 0,
		description: '',
	};
	/* ops.goCarry = {
		token: 'C',
		code: 15,
		executor: null,
		args: 1,
		description: 'O A - go to adress stored at adress A if lat op '
	}; */
	ops.jumpNegative = {
		token: 'U',
		code: 16,
		executor: null,
		args: 2,
		description: 'U A B - Jumps to adress B if value at adress A is negative'
	}
	
		
	return ops;
}