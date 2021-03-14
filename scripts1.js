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

    if ((operator === "/") && (b === "0")) {
        return "error";
    }

    function formatResult(result) {
        result = result.toString();

        // Error messages
        if ((result.length > 8) || (result.includes("e"))) { // 8 digit calculator
            return "error"
        }

        // Floating point values
        if (result.includes(".") && (result.length > 8)) {
            const decimalPlace = 9 - result.indexOf("."); // 8 digit calculator
            result = Number(result).toPrecision(decimalPlace);
            if (result.includes("e")) {
                return "error"
            };
            for (let i = result.length;
                result.charAt(result.length - 1) === "0";
                i--) {
                result = result.slice(0, result.length - 1);
            }
            return result;

        // Integer values
        } else {
            return result;
        }
    }

    switch (operator) {
        case "+" :
            return formatResult(add(a, b));
        case "-" :
            return formatResult(subtract(a, b));
        case "*" :
            return formatResult(multiply(a, b));
        case "/" :
            return formatResult(divide(a, b));
    }
}


// Keypress function

function calculate(key) {

    switch (key) {
        case "0" :
        case "1" :
        case "2" :
        case "3" :
        case "4" :
        case "5" :
        case "6" :
        case "7" :
        case "8" :
        case "9" :
            if (isResult) {
                array = [key];
                isResult = false;
            } else if (array[array.length - 1] === "0") {
                array[array.length - 1] = key;
            } else if ((array[array.length - 1].match(/\d/g)) &&
                       (array[array.length - 1].length < 8)) {
                array[array.length - 1] += key;
            } else if (array.length === 2) {
                array.push(key);
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if ((array.length < 3) || (isResult)) {
                array[1] = key;
            } else if (array.length === 3) {
                array = [operate(...array)];
                array[1] = key;
            }
            isResult = false;
            break;
        case "." :
            if (array.length !== 2 && !array[array.length-1].includes(".") && !isResult) {
                array[array.length - 1] += key;
            } else if (array.length === 2) {
                array.push("0.")
            } else if (isResult) {
                array = ["0."];
                isResult = false;
            }
            break;
        case "=" :
            if (array.length === 3) {
                array = [operate(...array)];
            } else if (array.length === 2) {
                array.pop();
            }
            break;
        case "addMem" :
            if (array.length === 3) { // if (array[array.length - 1].match(/\d/))
                memory = array[2];
            } else {
                memory = array[0];;
            }
            break;
        case "clearMem" :
            memory = undefined;
            break;
        case "memPlus" :
            if (array.length !== 2) {
                memory = (memory) ? (+memory + +array[array.length - 1]).toString() :
                    array[array.length - 1];
            }
            break;
        case "recallMem" :
            if (memory) {
                if (array.length !== 2) {
                    array[array.length - 1] = memory;
                } else if (array.length === 2) {
                    array.push(memory);
                }
            }
            break;
        case "del" :
            if (array === ["0"]) {
                break;
            } else if (array.length !== 2) {
                if (array[array.length - 1].length > 1) {
                    array[array.length - 1] =
                        array[array.length - 1].slice(0, array[array.length - 1].length - 1);
                } else if ((array[2] == "0") || (array.length == 2)) {
                    array = ["0"];
                } else { // 1 digit 1-9
                    array[array.length - 1] = "0";
                }
            }
            break;
        case "clearEntry" :
            if (array[array.length - 1] === ["0"]) {
                break;
            } else if (array.length !== 2) {
                array[array.length - 1] = "0";
            } else { // array.length === 2
                array.pop();
            }
            break;
        case "clear" :
            array = ["0"];
    }


    console.log(array);
    console.log(isResult);
    console.log(memory);
}

// on click - (calculate(buttonValue));