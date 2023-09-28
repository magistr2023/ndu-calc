String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this));
}
function MathSolver() {
    this.solvePostfix = function(postfix) {
        var resultStack = [];
        postfix = postfix.split(" ");
        for(var i = 0; i < postfix.length; i++) {
            if(postfix[i].isNumeric()) {
                resultStack.push(postfix[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();
                switch(postfix[i]){
                	case  "+": 
	                	resultStack.push(parseFloat(b) + parseFloat(a));
	                	break;
                	case  "-": 
	                	resultStack.push(parseFloat(b) - parseFloat(a));
	                	break;
                	case  "*": 
	                	resultStack.push(parseFloat(b) * parseFloat(a));
	                	break;
                	case  "/": 
	                	resultStack.push(parseFloat(b) / parseFloat(a));
	                	break;
                	case  "^": 
	                	resultStack.push(Math.pow(b, a));
	                	break;
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    }
}