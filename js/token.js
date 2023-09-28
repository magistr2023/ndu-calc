function Token(type, value) {
	this.type = type;
	this.value = value;
}

function isDigit(ch) {
	return /\d/.test(ch);
}

function isOperator(ch) {
	return /\+|-|\*|\/|\^/.test(ch);
}

function isLeftParenthesis(ch) {
	return /\(/.test(ch);
}

function isRightParenthesis(ch) {
	return /\)/.test(ch);
}

function tokenize(str) {
	str.replace(/\s+/g, "");
	str.replace(")(", ")*(");
	str=str.split("");

	var result=[];
	var letterBuffer=[];
	var numberBuffer=[];

	str.forEach(function (char) {
		if(isDigit(char)) {
			numberBuffer.push(char);
		} else if(char==".") {
			numberBuffer.push(char);
		} else if (isOperator(char)) {
			emptyNumberBufferAsLiteral();
			result.push(new Token("Operator", char));
		} else if (isLeftParenthesis(char)) {
			if(numberBuffer.length) {
				emptyNumberBufferAsLiteral();
				result.push(new Token("Operator", "*"));
			}
			result.push(new Token("Left Parenthesis", char));
		} else if (isRightParenthesis(char)) {
			emptyNumberBufferAsLiteral();
			result.push(new Token("Right Parenthesis", char));
		} 
	});
	if (numberBuffer.length) {
		emptyNumberBufferAsLiteral();
	}
	return result;

  	function emptyNumberBufferAsLiteral() {
		if(numberBuffer.length) {
			result.push(new Token("Variable", numberBuffer.join("")));
			numberBuffer=[];
		}
	}

}