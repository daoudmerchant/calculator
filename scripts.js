// digits

const digits = 8;

// DOCUMENT SELECTORS

const screenOperands = document.getElementById("operands");
const buttons = document.querySelectorAll("button");
const background = document.getElementById('background');

// display symbols

const displayPlus = document.getElementById("display+");
const displayMinus = document.getElementById("display-");
const displayMultiply = document.getElementById("display*");
const displayDivide = document.getElementById("display/");

const displayOperators = document.querySelectorAll(".displayOperator");

const displayMem = document.getElementById("displayM");
const displayAns = document.getElementById("displayAns");

// STARTING VALUES

let array = ["0."];
let isFloatingPoint = false;
let memory, isResult;
screenOperands.textContent = array[0];

// MATH FUNCTIONS

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

    // Invalid values

    if ((result > (10 ** digits - 1)) || // > 99999999
        (result > (10 ** (digits - 1)) && !Number.isInteger(result)) ||
        (result === Infinity)) {
        return "error";
    }

    result = result.toString();

    // Expand negative E notation values (if required) or throw error

    if (result.includes("e-")) {
        const eValueIndex = result.indexOf("-") + 1;
        const eValue = result.slice(eValueIndex);
        if (eValue < digits) {
            result = Number(result).toFixed(digits - 1).toString();           
        } else {
            return "error"; // too small to be displayed
        }
    }

    // Requires more code for positive E notation values if digits > 22
    // Already concerned I'm weirdly overkilling this calculator

    // floating point values
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
    } else { // integer values
        return `${result}.`;
    }
}

// ON KEYPRESS

function calculate(key) {

    switch (key) {
        case "b0" :
        case "b1" :
        case "b2" :
        case "b3" :
        case "b4" :
        case "b5" :
        case "b6" :
        case "b7" :
        case "b8" :
        case "b9" :
            if (isResult) { // replace result value
                array = [`${key.charAt(1)}.`];
                isResult = false;
            } else if ((array[array.length - 1] === "0.") &&
                       (!isFloatingPoint)) {
                array[array.length - 1] = `${key.charAt(1)}.`; // replace 0
            } else if ((array.length !== 2) &&
                       (array[array.length - 1].length < digits + 1) &&
                       (!isFloatingPoint)) {
                array[array.length - 1] =
                        `${array[array.length - 1].slice(0, array[array.length - 1].length - 1)}${key.charAt(1)}.`; // increase integer
            } else if ((isFloatingPoint) && (array[array.length - 1].length <= digits)) {
                array[array.length - 1] += key.charAt(1); // add num after decimal point
            } else if (array.length === 2) {
                array.push(`${key.charAt(1)}.`); // add 2nd operand
            }
            break;
        case "b+":
        case "b-":
        case "b*":
        case "b/":
            if ((array.length < 3) || (isResult)) {
                array[1] = key.charAt(1);
            } else if (array.length === 3) {
                array = [operate(...array)];
                array[1] = key.charAt(1);
            }
            isResult = false;
            isFloatingPoint = false;
            break;
        case "b." :
            if (array.length === 2) {
                array.push("0.")
            } else if (isResult) {
                array = ["0."];
                isResult = false;
            }
            isFloatingPoint = true;
            break;
        case "pi" :
            if (array.length === 1) {
                array[0] = "3.1415927";
            } else {
                array[2] = "3.1415927";
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
        case "b%" :
            if (array.length === 1) {
                break;
            } else if ((array.length === 3) && (array[2] !== "0.")) {
                array[2] = calcPercentage(...array);
            }
            array = [operate(...array)];
            break;
        case "b=" :
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
            } else if ((array[2] === "0.") || (isResult)) {
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
}

// INPUT EVENT FUNCTIONS

function pressButton(input) {
    if (input instanceof MouseEvent) {
        console.log(input.target.getAttribute("id"));
        calculate(input.target.getAttribute("id"));
        input.target.classList.toggle('raised');
    } else if (input instanceof KeyboardEvent) {
        if (input.key === "Shift") { return };
        if (input.key === "k") { showHelp() };
        const keyValue = convertKey(input.key);
        calculate(keyValue);
        document.getElementById(`${keyValue}`).classList.toggle('raised');
    }
    if (array.length === 1) {
        screenOperands.textContent = array[0];
    } else if (array.length === 3) {
        screenOperands.textContent = array[2];
    }
    setDisplaySymbols();
}

function unpressButton(input) {
    if (input instanceof MouseEvent) {
        input.target.classList.toggle('raised');
    } else if (input instanceof KeyboardEvent) {
        if (input.key === "Shift") { return };
        if (input.key === "k") { hideHelp() };
        const keyValue = convertKey(input.key);
        document.getElementById(`${keyValue}`).classList.toggle('raised');
    }
}

// EVENT LISTENERS

// mouse events

buttons.forEach(button => {
    button.addEventListener("mousedown", pressButton);
    button.addEventListener("mouseup", unpressButton);
})

// keyboard events

window.addEventListener('keydown', key => pressButton(key));
window.addEventListener('keyup', key => unpressButton(key));

function convertKey(key) {
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
        case "+" :
        case "-" :
        case "*" :
        case "/" :
        case "." :
        case "=" :
        case "%" :
            return `b${key}`
        case "Backspace" :
            return "del";
        case "q" :
            return "allClear";
        case "w" :
            return "clearEntry";
        case "a" :
            return "addMem";
        case "s" :
            return "clearMem";
        case "d" :
            return "recallMem";
        case "f" :
            return "memPlus";
        case "z" :
            return "pi";
        case "x" :
            return "b%";
        case "c" :
            return "plusMinus";
        case "Enter" :
            return "b=";
    }
}

// DISPLAY FUNCTIONS

function setDisplaySymbols() {
    setDisplayAns();
    setDisplayMemory();
    setDisplayOperators();
}

function setDisplayAns() {
    if (isResult) {
        displayAns.classList.remove("off");
    } else {
        displayAns.classList.add("off");
    }
}

function setDisplayMemory() {
    if (memory) {
        displayMem.classList.remove("off");
    } else {
        displayMem.classList.add("off");
    }
}

function setDisplayOperators() {
    if (array.length === 3) {
        return;
    } else {
        displayOperators.forEach(displayOperator => displayOperator.classList.add("off"));
    }
    if (array.length === 2) {
        switch (array[1]) {
            case "+" :
                displayPlus.classList.remove("off");
                break;
            case "-" :
                displayMinus.classList.remove("off");
                break;
            case "*" :
                displayMultiply.classList.remove("off");
                break;
            case "/" :
                displayDivide.classList.remove("off")
                break;
        }
    }
}

function showHelp() {
    buttons.forEach(button => {
        switch (button.textContent) {
            case "C" :
                button.textContent = "q";
                break;
            case "CE" :
                button.textContent = "w";
                break;
            case "M" :
                button.textContent = "a";
                break;
            case "MC" :
                button.textContent = "s";
                break;
            case "MRC" :
                button.textContent = "d";
                break;
            case "M+" :
                button.textContent = "f";
                break;
            case "π" :
                button.textContent = "z";
                break;
            case "%" :
                button.textContent = "x";
                break;
            case "±" :
                button.textContent = "c";
                break;
            case "÷" :
                button.textContent = "/";
                break;
            case "×" :
                button.textContent = "*";
                break;
            case "=" :
                button.textContent = "= or ⏎"
                break;
        }
    })
}

function hideHelp() {
    buttons.forEach(button => {
        switch (button.textContent) {
            case "q" :
                button.textContent = "C";
                break;
            case "w" :
                button.textContent = "CE";
                break;
            case "a" :
                button.textContent = "M";
                break;
            case "s" :
                button.textContent = "MC";
                break;
            case "d" :
                button.textContent = "MRC";
                break;
            case "f" :
                button.textContent = "M+";
                break;
            case "z" :
                button.textContent = "π";
                break;
            case "x" :
                button.textContent = "%";
                break;
            case "c" :
                button.textContent = "±";
                break;
            case "/" :
                button.textContent = "÷";
                break;
            case "*" :
                button.textContent = "×";
                break;
            case "= or ⏎" :
                button.textContent = "=";
                break;
        }
    })
}

// BACKGROUND TEXT GENERATOR

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
for (let i = 1; i <= 50000; i++) {
    text += generateCharacter();
}
background.textContent = text;