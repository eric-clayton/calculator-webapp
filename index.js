function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero"
    }
    return a / b;
}

function operate(operand1, operator, operand2) {
    if(typeof operand1 !== 'number') {
        return NaN;
    }
    switch(operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '+/-':
            return operand1 * -1;
        case '%':
            return operand1 / 10;
        default:
            return "Not a valid operator";
    }
}

let decimal = false;
const displayNode = document.querySelector('#display');
let display = displayNode.textContent;
let operand1 = null;
let operand2 = null;
let operator = null;
let displayReset = true;
const calculatorButtons = document.querySelector('.calculator-buttons');
calculatorButtons.addEventListener('click', handleButtonClick)
function handleButtonClick(e) {
    if(e.target.tagName !== 'BUTTON') {
        return;
    }
    const OPERATORS = '+/-*=%'
    const buttonText = e.target.textContent
    if(OPERATORS.includes(buttonText)) {
        if (buttonText == '=') {
            inputEquals();
        }
        else if (buttonText == '+/-' || buttonText == '%') {
            display = operate(+display, buttonText);
        }
        else {
            inputOperator(buttonText);
        }
    }
    else if (buttonText == 'AC'){
        inputClear();
    }
    else {
        inputOperand(buttonText);
    }
    displayNode.textContent = display;
    // ${operand1 === null ? display : operand1} ${operator ? operator : ''} ${operator !== null ? operand2 != null ? operand2 : display :  ''}`
}
function inputEquals() {
    if (operand1 === null && operand2 === null) {
        return;
    }
    if (operand1 === null) {
        operand1 = +display;
    }
    if (operand2 === null) {
        operand2 = +display;
    }
    display = operate(operand1, operator, operand2);
    operand1 = null
    displayReset = true;
}
function inputOperator(newOperator) {
    if (operand1 === null) {
        operand1 = +display;
        operand2 = null
    }
    else if (operand2 === null) {
        if(displayReset) {
            operator = newOperator;
            return;
        }
        operand2 = +display;
    }
    if(operand1 !== null && operand2 !== null && operator !== null) {
        display = operate(operand1, operator, operand2)
        operand1 = display;
    }
    operand2 = null;
    operator = newOperator;
    displayReset = true;
}
function inputClear() {
    operand1 = null;
    operand2 = null;
    operator = null;
    decimal = false;
    displayReset = true;
    display = "0";
}

function inputOperand(operand) {
    MAX_DISPLAY_LENGTH = 10
    if(display.length === MAX_DISPLAY_LENGTH) {
        return;
    }
    if(displayReset || display == '0') {
        display = operand === '.' ? "0" : "";
        displayReset = false;
    }
    if(operand == '.') {
        if (decimal) {
            return;
        }
        else {
            decimal = true;
        }
    }
    display += operand;
}