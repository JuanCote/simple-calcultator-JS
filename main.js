const input = document.getElementById('input')
const divide = document.getElementById('divide').innerText
const multiply = document.getElementById('multi').innerText

document.getElementById('numbers').addEventListener('click', function(e) {
    let elem = e.target.innerText
    if (elem != '=' && !['row', 'numbers'].includes(e.target.id)) {
        
        if ((!Number.isInteger(parseInt(elem)) && !Number.isInteger(parseInt(input.innerText[input.innerText.length-1]))) || (input.innerText.length > 12)) {
            //pass
        }else {
            if (elem == '.') {
                if (input.innerText.replaceAll('+', '$').replaceAll('-', '$').replaceAll(divide, '$').replaceAll(multiply, '$').split('$').at(-1).includes('.')) {
                    // pass
                }else {
                    input.innerText += elem
                }
            }else {
                input.innerText += elem
            }
        }
    }
})

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
        input.innerText = parseFloat(result.toFixed(10))
    }else {
        input.innerText = result
    }

})
