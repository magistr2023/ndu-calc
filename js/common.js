(function(){
	var inputResult = document.querySelector(".result");
	var buttons = document.querySelectorAll(".button");
	[].forEach.call(buttons,function(el){
	    el.addEventListener('click', function (e) {
	    	let operator = e.srcElement.innerText.toLowerCase();
	        let stringInput = inputResult.value;
	        switch(operator){
	        	case  "ac": 
	            	inputResult.value = "";
	            	break;
	        	case  "c": 
	            	inputResult.value = stringInput.slice(0, -1);
	            	break;
	            case  "=": 
	            	inputResult.value = getResult(stringInput);
	            	break;
	        	default:
	        		inputResult.value = stringInput + operator;
	        		break;

	        }
	    })
	});
	inputResult.onkeydown = function(event){
		if (event.keyCode===187) {
			inputResult.value = getResult(inputResult.value );
			return false;
		}
		let allowKey = [8,37,39,187,48,54,56,57,189]
		return (event.keyCode >= 48 && event.keyCode <= 57) 
				|| (event.keyCode >= 96 && event.keyCode <= 111) 
				|| allowKey.indexOf(event.keyCode) > -1;
	};
})();

function getResult(input){
	let parser = new MathSolver();
	let rpn = parse(input);
	if (rpn!==null) {
		let rpnString  = toString(rpn);
		let result = parser.solvePostfix(rpnString);
		if (isNaN(result) || result === undefined) {
			return "Error";
		}
		return +result.toPrecision(14);
	}
	return "Error";
}

