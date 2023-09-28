function parse(inp){
	var outQueue=[];
	var opStack=[];
	var isError = false;
	Array.prototype.peek = function() {
		return this.slice(-1)[0];
	};

	var assoc = {
		"^" : "right",
		"*" : "left",
		"/" : "left",
		"+" : "left",
		"-" : "left"
	};

	var prec = {
		"^" : 4,
		"*" : 3,
		"/" : 3,
		"+" : 2,
		"-" : 2
	};

	Token.prototype.precedence = function() {
		return prec[this.value];
	};
	
	Token.prototype.associativity = function() {
		return assoc[this.value];
	};

	var tokens=tokenize(inp);
	/*! Алгоритм сортировочной станции !*/
	tokens.forEach(function(v) {
		if (!isError) {
			//Если токен — число, то добавить его в очередь вывода.
			if(v.type === "Variable" ) {
				outQueue.push(v);
			}
			//Если токен — оператор op1, то:
			else if(v.type == "Operator") {
			  //Пока присутствует на вершине стека токен оператор op2, и
			  while (opStack.peek() && (opStack.peek().type === "Operator") 
				//Либо оператор op1 лево-ассоциативен и его приоритет меньше, чем у оператора op2 либо равен,
				&& ((v.associativity() === "left" && v.precedence() <= opStack.peek().precedence())
					//или оператор op1 право-ассоциативен и его приоритет меньше, чем у op2,
					|| (v.associativity() === "right" && v.precedence() < opStack.peek().precedence()))) {
			  		//переложить op2 из стека в выходную очередь;
			  		outQueue.push(opStack.pop());
				}
				//положить оператор op1 в стек.
				opStack.push(v);
			} 
			//Если токен — открывающая скобка, то положить его в стек.
			else if(v.type === "Left Parenthesis") {
				opStack.push(v);
			}
			//Если токен — закрывающая скобка:
			else if(v.type === "Right Parenthesis") {
				//Пока токен на вершине стека не является открывающей скобкой, перекладывать операторы из стека в выходную очередь.
				while(opStack.peek() 
					&& opStack.peek().type !== "Left Parenthesis") {
					outQueue.push(opStack.pop());
				}
				//Если стек закончился до того, как был встречен токен открывающая скобка, то в выражении пропущена скобка.
				if(opStack.length == 0){
					// console.log("Unmatched parentheses");
					isError = true;
				}
				//Выкинуть открывающую скобку из стека, но не добавлять в очередь вывода.
				opStack.pop();
			}
		}	
	});
	if (isError) {
		return null;
	}
	return outQueue.concat(opStack.reverse());
}

function toString(rpn) {
	return rpn.map(token => token.value).join(" ");
}