// Starting declarations

let array = ["0"];
let memory, isResult;
const screenText = document.querySelector("#display").textContent;
const buttons = document.querySelectorAll(".button");

// Math functions

const add = (a, b) => +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, operator, b) {
    isResult = true;

    function round(result) {

        // Error messages
        if ((result > 99999999) || (result < 0.0000001)) {
            return "error"
        } else if ((operator === "/") && (b === "0")) {
            return "error"

        // Floating point values
        } else if (!Number.isInteger(result)) {
            result = result.toPrecision(8); // 8 digit calculator
            for (let i = result.length;
                result.charAt(result.length - 1) === "0";
                i--) {
                result = result.slice(0, result.length - 1);
            }
            return result;

        // Integer values
        } else {
            return result.toString();
        }
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

function clear() {
    array = ["0"];
    console.log[array] // display array
}

function calculate(key) {
    isResult = false;
    if (array[0] === "error") { array = ["0"] };

    if ((array.length === 1) &&
        (array[0] === "0") &&
        (key === "0")) {
        return;
    } else if ((array[array.length - 1].includes(".")) &&
               (key === ".")) {
        return;
    } else if ((key.match(/\d/) &&
               array[array.length - 1].length < 9)) { // 8 digit calculator

        if (isResult) {
            array[0] = key;
        } else if (array[array.length - 1] === "0") {
            array[array.length - 1] = key;
        } else if (array[array.length - 1].match(/\d/g)) {
            array[array.length - 1] += key;
        } else {
            array.push(key);
        }
    } else if (key.match(/[-+*/]/)) {
        if (array[0] === "error") {
            clear();
        } else if ((array.length < 3) || (isResult)) {
            array[1] = key;
        } else if (array.length === 3) {
            array = [operate(...array)];
            array[1] = key;
        }
    } else if (key === ".") {
        if (array.length !== 2 && !array[array.length-1].match(/[.]/) && !isResult) {
            array[array.length - 1] += key;
        } else if ((isResult) || (array[0] === "error")) {
            array = ["0."];
        }
    } else if (key === "=") {
        if (array.length === 3) {
            array = [operate(...array)];
        } else if (array.length === 2) {
            array.pop();
        }
    } else if (key === "addMem") {
        if (array[array.length - 1].match(/\d/)) {
            memory = array[array.length - 1];
        }
    } else if (key === "clearMem") {
        memory = undefined;
    } else if (key === "memPlus") {
        if ((array[array.length - 1].match(/\d/) &&
            array[array.length - 1] !== "0")) {
                memory = (memory) ? (add(memory, array[array.length - 1])).toString() :
                    array[array.length - 1];
        }
    } else if (key === "recallMem") {
        if ((memory) &&
            (!array[array.length - 1].match(/\d/))) {
            array.push(memory);
        }
    } else if (key === "del") {
        if (array[array.length - 1].match(/\d/)) {
            if (array[array.length - 1].length > 1) {
                array[array.length - 1] =
                    array[array.length - 1].slice(0, array[array.length - 1].length - 1);
            } else if ((array[2] == "0") ||
                       (array.length == 2)) {
                clear();
            } else {
                array[array.length - 1] = "0";
            }
        }
    } else if (key === "clearEntry") {
        if (array[array.length - 1].match(/\d/)) {
            array[array.length - 1] = "0";
        }
    } else if (key === "clear") {
        clear();
    }

    console.log(array);
    console.log(isResult);
}

// on click - (calculate(buttonValue));