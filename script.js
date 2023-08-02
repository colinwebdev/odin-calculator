const screen = document.querySelector('.screen')
const displayMax = 10

let newValue = true
let firstOperand = true
let total = 0
let operation
let display = total


function pressNum(num) {
    if (screen.innerHTML == 'ERROR') {
        clearScreen()
        pressNum(num)
        return
    }
    if (newValue) {
        display = String(num)
        newValue = false
    } else if (display.length < displayMax) {
        display = display + String(num)
    } 
    screen.innerHTML = display
}

function pressOperand(symbol) {
    if (!firstOperand && symbol != '=') {
        calculate()
    } else if (firstOperand && symbol != '=') {
        total = display
        firstOperand = false
    }
    newValue = true
    switch(symbol) {
        case '+':
            operation = 'add'
            break
        case '/':
            operation = 'divide'
            break
        case '*':
            operation = 'multiply'
            break
        case '-':
            operation = 'subtract'
            break
        case '=':
            calculate()
            break
    }
}

function addDecimal() {
    if (!display.includes('.')) {
        display = display  + '.'
        screen.innerHTML = display
    }
}

function backspace() {
    display = display.length > 1 ? display.slice(0, display.length - 1) : '0'
    display.length <= 1 ? newValue = true : ''
    screen.innerHTML = display
}

function clearScreen() {
    display = 0
    screen.innerHTML = display
    total = 0
    newValue = true
    operand = undefined
    firstOperand = true
}

function calculate() {
    total = Number(total)
    display = Number(display)
    switch(operation) {
        case 'add':
            total = total + display
            break
        case 'divide':
            total = total / display
            break
        case 'multiply':
            total = total * display
            break
        case 'subtract':
            total = total - display
            break
    }
    screen.innerHTML = String(total).length > displayMax ? 'ERROR' : total
}

document.addEventListener("keyup", (event) => {
    const operands = ['-', '+', '*', '/', '=']
    if (event.code == 'Space' || event.key == 'Enter') {
        calculate()
    } else if (!isNaN(event.key)) {
        pressNum(event.key)
    } else if (operands.includes(event.key)) {
        pressOperand(event.key)
    } 
    
})


screen.innerHTML = display
total = 0