const winPoints = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const boxes = document.querySelectorAll('.box')
const resultNum = document.querySelectorAll('#result-num')
let O_Turn = false
const X_Option = 'X'
const O_Option = 'O'

const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            play(e)
        }, {
            once: true
        })
    })
}

const play = (e) => {
    const box = e.target
    const currOption = O_Turn ? O_Option : X_Option

    placeMark(box, currOption)
    if(checkWin(currOption)){
        winMsg(false)
    }else if(isDraw()){
        winMsg(true)
    }else{
        switchPlayers()
    }
}

const placeMark = (box, curr) => {
    box.innerHTML = curr
    box.style.color = curr == X_Option ? 'green' : 'red'
}

const switchPlayers = () => {
    O_Turn = !O_Turn
}

const checkWin = (curr) => {
    return winPoints.some(combitaion => {
        return combitaion.every(i => {
            return boxes[i].innerHTML == curr
        })
    })
}

const winMsg = (isdraw) => {
    if(isdraw){
        //@ts-ignore
        swal({
            title: 'Draw!',
            icon: 'warning'
        })
        .then(() => {
            boxes.forEach(box => box.innerHTML = '')
            startGame()
        })
    }else{
        const winner = O_Turn ? 'O' : 'X'
        
        let X_Result = resultNum[0].innerHTML
        let O_Result = resultNum[1].innerHTML
        //@ts-ignore
        winner == 'X' ? resultNum[0].innerHTML = parseInt(X_Result) + 1 : resultNum[1].innerHTML = parseInt(O_Result) + 1

        //@ts-ignore
        swal(`${winner} Won`, "Good game !", "success")
        .then(() => {
            boxes.forEach(box => box.innerHTML = '')
            startGame()
        })
    }
}

const isDraw = () => {
    return [...boxes].every(box => {
        //@ts-ignore
        return box.innerHTML == 'O' || box.innerHTML == 'X'
    })
}

const computer = () => {
    boxes[Math.floor(Math.random() * 9)].innerHTML = 'O'
    
}

startGame()