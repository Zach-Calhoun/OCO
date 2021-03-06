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


