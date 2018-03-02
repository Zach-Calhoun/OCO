function vmFactory() {
	var vm = {};
	
	//vm.code = [];
	vm.mem = [];
	vm.memMax = 32767;
	vm.mem.length = 32768;
	//program counter
	vm.pc = 0;
	//stack pointer
	vm.sp = vm.memMax;
	
	vm.flags = {
		carry: false,
		negative: false,
		zero: false,
		
	}
	
	vm.outputBuffer = "";

	var ops = operationsFactory();
	var mem = vm.mem;
	
	ops.load.executor = function(adress, value) {
		mem[adress] = value;
		vm.pc += 1 + ops.load.args;
	};
	ops.move.executor = function(src, dest) {
		var adr = mem[dest];
		mem[adr] = mem[src];
		vm.pc += 1 + ops.move.args;
	};
	ops.take.executor = function(dst, src) {
		var adr = mem[src];
		mem[dst] = mem[adr];
		vm.pc += 1 + ops.take.args;
	}
	ops.increase.executor = function(a,b){
		mem[a] = mem[a] + b;
		vm.pc += 1 + ops.increase.args;
	};
	ops.add.executor = function(a,b,c) {
		mem[c] = mem[a] + mem[b];
		vm.pc += 1 + ops.add.args;
	};
	ops.decrease.executor = function(a,b) {
		mem[a] = mem[a] - b;
		vm.pc += 1 + ops.decrease.args;
		if(mem[a] < 0)
			vm.flags.negative = true;
		else
			vm.flags.negative = false;
	};
	ops.subtract.executor = function(a,b,c) {
		mem[c] = mem[a] - mem[b];
		vm.pc += 1 + ops.subtract.args;
		if(mem[c] < 0)
			vm.flags.negative = true;
		else
			vm.flags.negative = false;
	};
	ops.jump.executor = function(a) {
		vm.pc = a;
		//vm.pc += 1 + ops.jump.args;
	};
	ops.go.executor = function(a) {
		vm.pc = mem[a];
		//vm.pc += 1 + ops.go.args;
	};
	ops.jumpZero.executor = function(a, b) {
		if(mem[a] == 0)
			vm.pc = b;
		else
		vm.pc += 1 + ops.jumpZero.args;
	};
	ops.goZero.executor = function(a, b) {
		if(mem[a] == 0)
			vm.pc = mem[b];
		else
			vm.pc += 1 + ops.goZero.args;
	};
	ops.print.executor = function(charAdress) {
		let c = String.fromCharCode(mem[charAdress]);
		console.log(c);
		console.log(mem[charAdress]);
		vm.outputBuffer += c;
		vm.pc += 1 + ops.print.args;
	};
	ops.read.executor = function(charAdress) {
		//todo
		vm.pc += 1 + ops.read.args;
	}
	ops.nand.executor = function(a,b,c) {
		mem[c] = mem[a] & mem[b];
		vm.pc += 1 + ops.nand.args;
	}
	ops.jumpNegative.executor = function(a,b) {
		if(mem[a] < 0)
			vm.pc = b;
		else vm.pc += 1 + ops.jumpNegative.args;
	}
	
	vm.exec = function(initPc, code) {	
	//this.pc = initPc;
		for(vm.pc = initPc; vm.pc < code.length;)
		{
			let pc = vm.pc;
			var bytecode = code[pc];
		
			//console.log(pc);
			//console.log(bytecode);
		
			switch(bytecode) {
				case ops.load.code: {
					let adr = code[pc+1];
					let val = code[pc+2];
					ops.load.executor(adr,val);
					//pc = pc + 3;
					break;
				}
				case ops.move.code: {
					let adr1 = code[pc+1];
					let adr2 = code[pc+2];
					ops.move.executor(adr1,adr2);
					//pc = pc+3;
					break;
				}
				case ops.increase.code: {
					let adr1 = code[pc+1];
					let val = code[pc+2];
					ops.increase.executor(adr1,val);
					//pc = pc+3;
					break;
				}
				case ops.add.code: {
					let adr1 = code[pc+1];
					let adr2 = code[pc+2];
					let adr3 = code[pc+3]
					ops.add.executor(adr1,adr2,adr3);
					//pc = pc + 4;
					break;
				}
				case ops.decrease.code:{
					let adr1 = code[pc+1];
					let val = code[pc+2];
					ops.decrease.executor(adr1,val);
					break;
				}
				case ops.subtract.code:{
					let adr1 = code[pc+1];
					let adr2 = code[pc+2];
					let adr3 = code[pc+3];
					ops.subtract.executor(adr1,adr2,adr3);
					break;
				}
				case ops.jump.code:{
					let adr = code[pc+1];
					ops.jump.executor(adr);
					break;
				}
				case ops.go.code: {
					let adr = code[pc+1];
					ops.go.executor(adr);
					break;
				} 
				case ops.jumpZero.code:{
					let adr = code[pc+1];
					let jadr = code[pc+2];
					ops.jumpZero.executor(adr,jadr);
					break;
				}			
				case ops.goZero.code: {
					let adr = code[pc+1];
					let jadr = code[pc+2];
					ops.goZero.executor(adr,jadr);
					break;
				}
				case ops.print.code: {
					let adr = code[pc+1];
					ops.print.executor(adr);
					break;
				}
				case ops.read.code:{
					let adr = code[pc+1];
					ops.read.executor(adr);
					break;
				}
				case ops.nand.code:{
					let adr1 = code[pc+1];
					let adr2 = code[pc+2];
					let adr3 = code[pc+3];
					ops.nand.executor(adr1,adr2,adr3);
					break;
				}
				case ops.jumpNegative.code: {
					let adr1 = code[pc+1];
					let adr2 = code[pc+2];
					ops.jumpNegative.executor(adr1, adr2);
					break;
				}
			}
			
		}
	return vm.outputBuffer;
	}	
	
	
	return vm;
}

