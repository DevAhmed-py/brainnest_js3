window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.KeyboardEvent.code}']`);
    key.click();
});

let displayVal = '0';

const displayUpdate = () => {
    const display = document.querySelector('.display');
    display.innerText = displayVal;
    if(displayVal.length > 10) {
        display.innerText = displayVal.substring(0, 10);
    }
}
displayUpdate();

const buttons = document.querySelectorAll('button');
const buttonClick = () => {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if(buttons[i].classList.contains('operand')) {
                operand(buttons[i].value);
                displayUpdate();
            } else if(buttons[i].classList.contains('operator')) {
                Operator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                equals();
                displayUpdate();
            } else if(buttons[i].classList.contains('percent')) {
                percent(displayVal);
                displayUpdate();
            } else if(buttons[i].classList.contains('sign')) {
                sign(displayVal);
                displayUpdate();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                displayUpdate();
        }
    )}
}
buttonClick();

let firstNum = null;
let secondNum = null;
let firstOperator = null;
let secondOperator = null;

const operand = (num) => {
    if(firstOperator === null) {
        if(displayVal === '0' || displayVal === 0) {
            displayVal = num;
        } else if(displayVal === firstNum) {
            displayVal = num;
        } else {
            displayVal += num;
        }
    } else {
        if(displayVal === firstNum) {
            displayVal = num;
        } else {
            displayVal += num;
        }
    }
}

let resultValue = null;

const Operator = (input) => {
    if(firstOperator != null && secondOperator === null) {
        secondOperator = input;
        secondNum = displayVal;
        resultValue = calculate(Number(firstNum), Number(secondNum), firstOperator);
        displayVal = roundAccurately(resultValue, 15).toString();
        firstNum = displayVal;
        resultValue = null;
    } else if(firstOperator != null && secondOperator != null) {
        secondNum = displayVal;
        resultValue = calculate(Number(firstNum), Number(secondNum), secondOperator);
        secondOperator = input;
        displayVal = roundAccurately(resultValue, 15).toString();
        firstNum = displayVal;
        resultValue = null;
    } else { 
        firstOperator = input;
        firstNum = displayVal;
    }
}

const calculate = (a, b, operat) => {
    if(operat === '+') {
        return a + b;
    } else if(operat === '-') {
        return a - b;
    } else if(operat === '*') {
        return a * b;
    } else if(operat === '/') {
        if(b === 0) {
            return 'error';
        } else {
        return a / b;
        }
    }
}

const roundAccurately = (num, places) => {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

const equals = () => {
    if(firstOperator === null) {
        displayVal = displayVal;

    } else if(secondOperator != null) {
        secondNum = displayVal;
        resultValue = calculate(Number(firstNum), Number(secondNum), secondOperator);
        if(resultValue === 'error') {
            displayVal = 'error';
        } else {
            displayVal = roundAccurately(resultValue, 15).toString();
            firstNum = displayVal;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            resultValue = null;
        }

    } else {
        secondNum = displayVal;
        resultValue = calculate(Number(firstNum), Number(secondNum), firstOperator);
        if(resultValue === 'error') {
            displayVal = 'error';
        } else {
            displayVal = roundAccurately(resultValue, 15).toString();
            firstNum = displayVal;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            resultValue = null;
        }
    }
}

const percent = (num) => {
    displayVal = (num/100).toString();
}

const sign = (num) => {
    displayVal = (num * -1).toString();
}

function clearDisplay() {
    displayVal = '0';
    firstNum = null;
    secondNum = null;
    firstOperator = null;
    secondOperator = null;
    resultValue = null;
}