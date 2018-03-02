console.log("I Live");

samples = [
{		title:"Add Test",
		src:"L 0,100 L 1,50 A 0,1,2 P 2 E",
		description:"",},
{
		title:"Division Test",
		src:"L 0 100 " +
			"L 1 10 " + 
			"L 2 0 " +
			"Z 0 24 " + 
			"S 0 1 0 "+ 
			"U 0 24 "+
			"I 2 1 "+
			"J 9 "+
			"P 2 E",
		description:"",},
		{
		title:"Decimal Print Test",
		src:"L 0 100 \n"+
			 "L 1 100 \n"+
			 "L 2 10 \n"+
			 "L 3 0 \n"+
			 "L 4 0 \n"+
			 "L 5 0 \n"+
			 "L 6 2 \n"+
			 "L 7 0 \n"+
			 
			 "Z 1 43 \n"+
			 "S 1 2 0 \n"+
			 "U 1 39 \n"+
			 "I 3 1 \n"+
			 "J 27 \n"+
			 
			 "A 1 2 4 \n"+
			 "I 5 1 \n"+
			 "A 6 5 7 \n"+
			 "A 4 48 4 \n"+
			 "M 4 6 \n"+
			 "L 4 0 \n"+
			 "L 3 0 \n"+
			 "L 1 0 \n"+
			 "Z 3 74 \n"+
			 "A 1 3 1 \n"+
			 "J 39 \n"+
			 
			 "Z 5 90 \n"+
			 "T 0 7 \n"+
			 "D 6 1 \n"+
			 "D 5 1 \n"+
			 "P 0 \n"+
			 "J 74 \n"+
			 "E E \n",	 
		description:"",}
]	
	
//division test
src = 
code = [];
	
window.onload = init;
	
//init();
//compile();
outputMessage = "";

function compile() {
	let src = document.getElementById('src').value;
	code = [];
	let result = cmp.parse(src, code);
	if(!result) {
		outputMessage = "Compiled Sucessfully, press RUN to run";
	} else {
		outputMessage = "Encountered Error while parsing \n" +
		result.message + "\n" +
		"At index: " + result.index +
		"Symbol: " + result.token;
	}
	
	document.getElementById('output').value = outputMessage;
	
}

function run() {
	let result = vm.exec(0, code);
	document.getElementById('output').value = result;
}


function init() 
{
	
	vm = vmFactory();
	cmp = new compiler();
	document.getElementById('btn_compile').addEventListener('click',compile);
	document.getElementById('btn_run').addEventListener('click',run);
	
	let sampleDropdown = document.getElementById('samples')
	sampleDropdown.onchange = function() { loadSample(sampleDropdown.value)}
	for(let i=0; i < samples.length; i++)
	{
		let opt = document.createElement("option");
		opt.innerHTML = samples[i].title;
		opt.value = i;
		//opt.addEventListener('click', function() { loadSample(i)})
		//opt.onchange = loadSample(i);
		sampleDropdown.appendChild(opt);		
	}
	
	
}

function loadSample(i)
{
	let src = document.getElementById('src');
	src.value = samples[i].src;
}

var print = function(a)
{
	console.log(a);
}


