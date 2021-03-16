// Starting declarations

let array = ["0."];
let isFloatingPoint = false;
let memory, isResult;
const digits = 8;
// const screenText = document.querySelector("#display").textContent;
const buttons = document.querySelectorAll(".button");
const background = document.getElementById('background');

// Math functions

const add = (a, b) => +a + +b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function calcPercentage(a, operator, b) {
    if ((operator === "*") || (operator === "/")) {
        return b / 100;
    } else { // + or -
        return (a / 100) * b;
    }
}

function operate(a, operator, b) {
    isResult = true;
    isFloatingPoint = false;

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

// Other functions

function clear() {
    array = ["0."];
    isResult = false;
}

function formatResult(result) {
    result = result.toString();

    // Invalid values
    
    if ((result.indexOf(".") > digits + 1) || // 99999999
        ((result.indexOf(".") === digits) && result.length > digits + 1) || // 10000000.1
        (result === "Infinity")) {
            return "error";    
    }

    // Expand negative E notation values (if required) or throw error

    if (result.includes("e-")) {
        const eValueIndex = result.indexOf("-") + 1;
        const eValue = result.slice(eValueIndex);
        if (eValue < digits) {
            result = result.toFixed(digits - 1);           
        } else {
            return "error"; // too small to be displayed
        }
    }

    // Requires more code for positive E notation values if digits > 22
    // Already concerned I'm overkilling this calculator

    // Floating point values
    if (result.includes(".")) {
        if (result.length > (digits + 1)) {
            const decimalPlace = digits - result.indexOf(".");
            result = Number(result).toFixed(decimalPlace).toString();
            if (result.includes("e")) {
                return "error"
            }; // necessary?
            for (let i = result.length;
                result.charAt(result.length - 1) === "0";
                i--) {
                result = result.slice(0, result.length - 1);
            }
        }
        return result;

        // Integer values
    } else {
        return `${result}.`;
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
            if (isResult) { // replace result value
                array = [`${key}.`];
                isResult = false;
            } else if ((array[array.length - 1] === "0.") &&
                       (!isFloatingPoint)) {
                array[array.length - 1] = `${key}.`; // replace 0
            } else if ((array.length !== 2) &&
                       (array[array.length - 1].length < digits + 1) &&
                       (!isFloatingPoint)) {
                array[array.length - 1] =
                        `${array[array.length - 1].slice(0, array[array.length - 1].length - 1)}${key}.`; // increase integer
            } else if ((isFloatingPoint) && (array[array.length - 1].length <= digits)) {
                array[array.length - 1] += key; // add num after decimal point
            } else if (array.length === 2) {
                array.push(`${key}.`); // add 2nd operand
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
            isFloatingPoint = false;
            break;
        case "." :
            if (array.length === 2) {
                array.push("0.")
            } else if (isResult) {
                array = ["0."];
                isResult = false;
            }
            isFloatingPoint = true;
            break;
        case "pi" :
            if (array.length !== 2) {
                array[array.length - 1] = "3.1415927";
            }
            break;
        case "plusMinus" :
            if ((array.length !== 2) && (array[array.length - 1] !== "0.")) {
                array[array.length - 1] =
                    (array[array.length - 1].charAt(0) === "-") ?
                    array[array.length - 1].slice(1) : "-" + array[array.length - 1];
                        // make minus invisible
                        // add visible minus on left side of display
            }
            isResult = false;
            break;
        case "%" :
            if ((array.length === 3) && (array[2] !== "0.")) {
                array[2] = calcPercentage(...array);
            }
            array = [operate(...array)];
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
                memory = array[0];
            }
            break;
        case "clearMem" :
            memory = undefined;
            break;
        case "memPlus" :
            if ((array.length !== 2) && (memory)) {
                memory = formatResult(+memory + +array[array.length - 1]);
            }
            break;
        case "memMinus" :
            if ((array.length !== 2) && (memory)) {
                memory = formatResult(+memory - +array[array.length - 1]);
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
            if (array === ["0."]) {
                break;
            } else if (array[2] === "0.") {
                clear();
            } else if (array.length !== 2) { // is number
                if (array[array.length - 1].charAt(array[array.length - 1]
                    .length - 1) !== ".") { // if floating point decimal
                        array[array.length - 1] = array[array.length - 1]
                            .slice(0, array[array.length - 1].length - 1);
                } else if (array[array.length - 1].length === 2) { // 1 digit integer
                    array[array.length - 1] = "0.";
                    isFloatingPoint = false;
                } else { // integer
                    array[array.length - 1] = array[array.length - 1]
                        .slice(0, array[array.length - 1].length - 2) + ".";
                    isFloatingPoint = false;
                }
            } else { // array.length === 2
                array.pop();
            }
            break;
        case "clearEntry" :
            if (array[array.length - 1] === ["0."]) {
                break;
            } else if (array.length !== 2) {
                array[array.length - 1] = "0.";
            } else { // array.length === 2
                array.pop();
            }
            isFloatingPoint = false;
            break;
        case "allClear" :
            clear();
    }


    console.log(array);
    console.log("Is result: " + isResult);
    console.log("Is floating point: " + isFloatingPoint);
    console.log(memory);
}

// on click - (calculate(buttonValue));

// background text generator

const generateNumber = () => Math.floor(Math.random() * 14) + 1;

function generateCharacter() {
    let char = generateNumber();
    switch (char) {
        case 1:
            return "0";
        case 2:
            return "1";
        case 3:
            return "2";
        case 4:
            return "3";
        case 5:
            return "4";
        case 6:
            return "5";
        case 7:
            return "6";
        case 8:
            return "7";
        case 9:
            return "8";
        case 10:
            return "9";
        case 11:
            return "*";
        case 12:
            return "/";
        case 13:
            return "+";
        case 14:
            return "-";
    }
}

let text = "";
for (let i = 1; i <= 40000; i++) {
    text += generateCharacter();
}
console.log(text);
background.textContent = text;