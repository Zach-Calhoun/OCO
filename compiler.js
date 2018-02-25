
function compiler() 
{
	this.ops = operationsFactory();
	
	this.expecting = {
	token: 0,
	literal: 1,
	}
	
	var expecting = this.expecting;
	var ops = this.ops;
	
	this.parse = function(src, code){
		let expected = expecting.token;
		let literal = '';
		let expectedArgs = 0;
		pc = 0;
	
		for(var i=0;i<src.length;i++)
		{
			let token = src[i];
			let bytecode = ops.nop.code;
			
			if((token == ' ' || token == '\n')&& (expected != expecting.literal || literal == '')) {
				continue;
			}
			if(token == ops.end.token) {
				return;
			}
			if((token >= '0' && token <= '9') || token == ',' || token == ' ' || token == '\n') {
				if(expected == expecting.token)
				{
					err = {
						message: 'Encountered literal when expecting operation',
						index: i,
						token: token,
					}
					console.error(err);
					return err;
				}
				else if(token == ',' || token == ' ' || token == '\n')
				{
					bytecode = parseInt(literal,10);
					literal = '';
					expectedArgs--;					
				}
				else 
				{
					literal = literal + token;	
					continue;
				}
				
				if(expectedArgs == 0)
				{
					expected = expecting.token;
				}
			} else 
			{
				if(expected == expecting.literal)
				{
					err = {
						message: 'Encountered operation when expecting value',
						index: i,
						token: token,
					}
					console.error(err);
					return err;
				}
				else
				{
					expected = expecting.literal;
					switch(token) {
						case ops.load.token: {
							bytecode = ops.load.code;
							expectedArgs = ops.load.args;					
							break;
						}
						case ops.move.token: {
							bytecode = ops.move.code;
							expectedArgs = ops.move.args;			
							break;
						}
						case ops.increase.token: {
							bytecode = ops.increase.code;
							expectedArgs = ops.increase.args;
							break;
						}
						case ops.add.token: {
							bytecode = ops.add.code;
							expectedArgs = ops.add.args;
							break;
						}
						case ops.decrease.token: {
							bytecode = ops.decrease.code;
							expectedArgs = ops.decrease.args;
							break;
						}
						case ops.subtract.token: {
							bytecode = ops.subtract.code;
							expectedArgs = ops.subtract.args;
							break;
						}
						case ops.jump.token: {
							bytecode = ops.jump.code;
							expectedArgs = ops.jump.args;
							break;
						}
						case ops.go.token: {
							bytecode = ops.go.code;
							expectedArgs = ops.go.args;
							break;
						}
						case ops.jumpZero.token: {
							bytecode = ops.jumpZero.code;
							expectedArgs = ops.jumpZero.args;
							break;
						}
						case ops.goZero.token: {
							bytecode = ops.goZero.code;
							expectedArgs = ops.goZero.args;
							break;
						}
						case ops.print.token: {
							bytecode = ops.print.code;
							expectedArgs = ops.print.args;
							break;
						}
						case ops.read.token: {
							bytecode = ops.read.code;
							expectedArgs = ops.read.args;
							break;
						}
						case ops.nand.token: {
							bytecode = ops.nand.code;
							expectedArgs = ops.nand.args;
							break;
						}
						case ops.push.token: {
							bytecode = ops.push.code;
							expectedArgs = ops.push.args;
							break;
						}
						case ops.pop.token: {
							bytecode = ops.pop.code;
							expectedArgs = ops.pop.args;
						}
						case ops.end.token: {
							bytecode = ops.end.code;
							expectedArgs = ops.end.args;
						}
						case ops.jumpNegative.token: {
							bytecode = ops.jumpNegative.code;
							expectedArgs = ops.jumpNegative.args;
						}
					}
				}
			}
			
			
			
			code[pc] = bytecode;
			pc++;
		}
	
	return;
	}
}


