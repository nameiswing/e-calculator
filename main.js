const $ = (el) => document.querySelector(el);
const $el = (e, el) => e.target.matches(el);

let inputDisplay = $('#input');
let outputVal;

window.onclick = (e) => {
    if($el(e,'button[data-value]')) appendToDisplay(e);
    if($el(e,'#ac')) clearDisplay();
    if($el(e,'#equals')) equals();
    if($el(e,'#del')) delLastChar();
}

const appendToDisplay = (e) => {
    if($el(e,'.operators') && $('#output').innerText) {
        clearDisplay();
        inputDisplay.innerText += outputVal;
    }

    const targetVal = e.target.dataset.value;
    const operators = ['×', '÷', '-', '+', '.'];
    const firstChar = ['×', '÷'];
    const isOperator = operators.includes(inputDisplay.innerText.charAt(inputDisplay.innerText.length - 1));
    if(isOperator && $el(e,'.operators')) return;
    if(inputDisplay.innerText.length == 0 && firstChar.includes(targetVal)) return;

    inputDisplay.innerText += targetVal;
}

const clearDisplay = () => {
    inputDisplay.innerText = '';
    $('#output').innerText = '';
}

const delLastChar = () => {
    const displayChars = inputDisplay.innerText;
    inputDisplay.innerText = displayChars.substring(0, displayChars.length - 1);
}

const equals = () => {
    const inputText = inputDisplay.innerText;
    let evalText = inputText;
    let result;
    
    try {
        if(inputText.includes('×')) evalText = inputText.replaceAll('×', '*');
        if(inputText.includes('÷')) evalText = inputText.replaceAll('÷', '/');
        
        result = eval(evalText);
        console.log(result);
        $('#output').innerText = result;
    } catch (error) {
        $('#output').innerText = "Syntax Error";
        console.warn(error.message);
    }

    outputVal = result;
}