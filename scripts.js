// Starting declarations

let array = ["0"];
let memory;
const screenText = document.querySelector("#display").textContent;
const buttons = document.querySelectorAll(".button");

// Math functions

const add = (a, b) => +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, operator, b) {

    // Floating point conversion

    let decimalValue = 0;
    
    function convertDecimal(num) {
        if ((num.match(/[.]/)) && num.length > 2) {
            const power = num.slice(num.indexOf("."), num.length - 1).length;
            decimalValue += power;
            return num * (10 ** power);
        } else {
            return num;
        }
    }

    a = convertDecimal(a);
    b = convertDecimal(b);

    function prepareValue(result, decimalValue) {
        return (result / (10 ** decimalValue)).toString();
    }

    switch (operator) {
        case "+" :
            return prepareValue(add(a, b), decimalValue);
        case "-" :
            return prepareValue(subtract(a, b), decimalValue);
        case "*" :
            return prepareValue(multiply(a, b), decimalValue);
        case "/" :
            return prepareValue(divide(a, b), decimalValue);
    }
}


// Keypress function

function calculate(key) {
    if ((array.length === 1) &&
        (array[0] === "0") &&
        (key === "0")) {

        return;
    } else if ((array[array.length - 1].includes(".")) &&
               (key === ".")) {

        return;
    } else if ((key.match(/\d/) &&
               array[array.length - 1].length < 9)) { // 8 digit calculator

        if (array[array.length - 1] === "0") {
            array[array.length - 1] = key;
        } else if (array[array.length - 1].match(/\d/g)) {
            array[array.length - 1] += key;
        } else {
            array.push(key);
        }
    } else if (key.match(/[-+*/]/)) {
        if (array.length < 3) {
            array[1] = key;
        } else if (array.length === 3) {
            array = [operate(...array)];
            array[1] = key;
        }
    } else if (key === ".") {
        if (array.length !== 2 && !array[array.length-1].match(/[.]/)) {
            array[array.length - 1] += key;
        }
    } else if (key === "=") {
        if (array.length === 3) {
            array = [operate(...array)];
        }
    }
    console.log(array);
}

// on click - (calculate(buttonValue));