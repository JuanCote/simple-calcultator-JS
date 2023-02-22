const input = document.getElementById('input')
const divide = document.getElementById('divide').innerText
const multiply = document.getElementById('multi').innerText

const numbers = document.getElementsByName('number')
for (let i = 0 ; i < numbers.length; i++) {
    numbers[i].addEventListener('click' , function() {
            if (!Number.isInteger(parseInt(numbers[i].innerText)) && !Number.isInteger(parseInt(input.innerText[input.innerText.length-1]))){

            }else if (input.innerText.length > 12) {

            }
            else {
                input.innerText += numbers[i].innerText
            }
    })
}

document.getElementById('c').addEventListener('click', function() {
    input.innerText = ''
})

document.getElementById('arrow').addEventListener('click', function() {
    input.innerText = input.innerText.slice(0, -1)
})

document.getElementById('equal').addEventListener('click', function() {
    const string = input.innerText
    const numbers = string.replaceAll('+', '$').replaceAll('-', '$').replaceAll(divide, '$').replaceAll(multiply, '$').split('$');
    
    const signs = string.split('').filter(function(elem) {
        if (['+', '-', divide, multiply].includes(elem)) {
            return elem
        }
    })
    
    for (let i = 0; i < signs.length; i++) {
        if (signs[i] == divide) {
            numbers[i] = numbers[i] / numbers[i+1]
            numbers.splice(i+1, 1)
            signs.splice(i, 1)
            i--
        } else if (signs[i] == multiply) {
            numbers[i] = numbers[i] * numbers[i+1]
            numbers.splice(i+1, 1)
            signs.splice(i, 1)
            i--
        }
    }

    let result = parseFloat(numbers[0])
    for (let i = 0; i < signs.length; i++) {
        if (signs[i] == '+') {
            result += parseFloat(numbers[i+1])
        } else if (signs[i] == '-') {
            result -= parseFloat(numbers[i+1])
        }
    }
    
    if (Number.isInteger(result)) {
        input.innerText = result
    }
    else if (result.toString().split('.')[1].length > 12) {
        input.innerText = result.toFixed(10)
    }else {
        input.innerText = result
    }

})
