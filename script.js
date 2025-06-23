// Operand operator
const calculatorDisplay = document.querySelector('h1')
const inputBtn = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

const calculate = {
    '/':(firstNumber,secondNumber)=> secondNumber === 0 ? 'error' : firstNumber/secondNumber,
    '*':(firstNumber,secondNumber)=>firstNumber * secondNumber,
    '+':(firstNumber,secondNumber)=>firstNumber + secondNumber,
    '-':(firstNumber,secondNumber)=>firstNumber - secondNumber,
    '=':(firstNumber,secondNumber)=>secondNumber
}

let firstValue = 0
let operatorValue = ''
let waitForNext = false // status 
// Plan: Must be input the firstValue and OperatorValue, then they can input the secondValue to be calculated

const setNumberValue = (number) => {
    if (waitForNext) {
        calculatorDisplay.textContent = number
        waitForNext = false
    }else{
        const displayValue =calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0'? number : displayValue + number
    }
   
}

const callOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent)
    if (operatorValue && waitForNext) {
        operatorValue = operator
        return
    }
    if (!firstValue) {
        firstValue = currentValue
    }else{
        const result = calculate[operatorValue](firstValue,currentValue)
        calculatorDisplay.textContent = result
        firstValue = result
        if (firstValue === 'error') {
            resetAll()
        }
    }
    operatorValue=operator
    waitForNext = true
}

const addDecimal = () => {
    if (waitForNext) return
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

inputBtn.forEach(input=>{
    if(input.classList.length === 0){
        input.addEventListener('click',()=>setNumberValue(input.value))
    }else if(input.classList.contains('operator')){
        input.addEventListener('click',()=>callOperator(input.value))
    }else if (input.classList.contains('decimal')) {
        input.addEventListener('click',()=>addDecimal())
        
        
    }
})
const resetAll = () =>{
    calculatorDisplay.textContent = '0'
}
clearBtn.addEventListener('click',()=>resetAll())