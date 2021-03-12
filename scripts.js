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
    function round(result) {
        result = result.toPrecision(8);
        if (result.match(/[.]/)) {
            for (let i = result.length;
                result.charAt(result.length - 1) === "0";
                i--) {
                result = result.slice(0, result.length - 1);
            }
        }
        return result;
    }

    switch (operator) {
        case "+" :
            return round(add(a, b));
        case "-" :
            return round(subtract(a, b));
        case "*" :
            return round(multiply(a, b));
        case "/" :
            return round(divide(a, b));
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