

//variaveis para armazenar valor, o operador e o estado da calculadora
let sValue = '0' // valor que será apresentado no display
let newValue = true // indica se o próximo dígito será de um novo número
let previousValue = 0 //valor acumulado para uma operação
let pendingOperation = null //operação acumulada




//atualização do visor
const displayUpdate = () => {

    let [intPart, floatPart] = sValue.split(',')

    if (intPart.length >13){
        document.getElementById('input-value').value = 'Erro'
        return
    }

    let v = ''
    c = 0
    for (let i = intPart.length - 1; i >= 0; i--){
        if (++c > 3){
            v = '.' + v
            c = 1
        }
        v = intPart[i] + v
    }
    v = v + (floatPart ? ',' + floatPart.substr(0, 2) : '')
    document.getElementById('input-value').value = v
}


// tratamento do clique no botao digito
const digit = (n) =>{
    if(newValue){
        sValue = '' + n
        newValue = false
    }else 
    sValue += n
    displayUpdate()
}

// tratamento do clique no botao decimal

const comma = () =>{
    if (newValue) {
        sValue = '0,'
        newValue = false
    }else if (sValue.indexOf(',') == -1)
        sValue += ','
        displayUpdate()
}

// tratamento do clique no botao ac
const allClear = () => {
    newValue = true
    previousValue = 0
    sValue = '0'
    pendingOperation = null
    displayUpdate()
}

// tratamento do clique no botao c
onload= () => {
    document.querySelector('#bt-clear').onclick = clear
}
const clear = () => {
    newValue=true
    sValue = sValue.substr(0, sValue.length - 1)
    displayUpdate()
}

// converte a string do valor para um número real

const currentValue = () => parseFloat(sValue.replace(',', '.'))

//tratamento do clique nos botões de operadores
const operator = (op) => {
    calculate()
    previousValue = currentValue()
    pendingOperation = op
    newValue = true
    //acumula nova operação
}

//tratamento do clique no botão =
const calculate = () =>{
    if(pendingOperation != null){
        let result
        switch(pendingOperation){
            case '+': result = previousValue + currentValue(); break
            case '-': result = previousValue - currentValue(); break
            case '*': result = previousValue * currentValue(); break
            case '/': result = previousValue / currentValue(); break
            case '%': result = previousValue * (currentValue()/100); break
        }

        sValue = result.toString().replace('.',',')
    }

    newValue = true
    pendingOperation = null
    previousValue = 0
    displayUpdate()
}
