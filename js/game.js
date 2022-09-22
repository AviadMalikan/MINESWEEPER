'use strict'

// Global variable:
// -------------------------------------------------------
const BOMB = '💣'
const FLAG = '🚩'


var gBoard
var gLevel = {
    size: 16,
    mines: 2,
}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    maxMarked: 2,
    maxMines: 2,
    maxShown: 16,
}
var gStartTime
var gTimeInterval
var gTimer


// Activate function:
// -------------------------------------------------------
function init() {

    gBoard = buildBoard()
    // console.table(gBoard)
    renderBoard(gBoard)

    // debugger
    // var res = 
    // console.log('res: ', res)

}

function resetGame() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    clearInterval(gTimeInterval)
    var smile = document.querySelector('.reset')
    smile.innerText = '😁'
    var h2 = document.querySelector('h2')
    h2.innerHTML = 'CLICK TO START!'

    init()
}

function setDifficult(diff, mines) {
    gLevel.size = diff
    gLevel.mines = mines
    gGame.maxShown = diff - mines
    gGame.maxMarked = mines
    gGame.maxMines = mines

    resetGame()
}

// Bsoard function:
// -------------------------------------------------------

function buildBoard() {
    var board = []
    var counterCells = 0

    //create the mat
    board = createMat(gLevel.size ** 0.5, gLevel.size ** 0.5)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShow: false,
                isMine: false,
                isMarked: false,
            }
            counterCells++
        }
    }

    createRandomMines(board)

    // board[1][1].isMine = true
    // board[3][3].isMine = true

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = setMinesNegsCount(board, i, j)
            }
        }
    }

    // console.log('board[0][0].isMine: ', board[0][0].isMine)

    return board;
}

function renderBoard(board) {

    var elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })
            // if (currCell.isMine === true) cellClass += ' bomb'
            if (currCell.isShow === false) cellClass += ' hide'


            cellClass += ''
            strHTML += `\t<td onmousedown="shockedSmile()" onmouseup="smilingSmile()"`
            strHTML += ` class="cell ${cellClass} "
            onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellMarked(event,this,${i},${j})">`
            if (currCell.isMine) strHTML += BOMB
            if (currCell.minesAroundCount === 0) strHTML += ' '
            if (currCell.minesAroundCount > 0) strHTML += currCell.minesAroundCount
            // ${board[i][j].minesAroundCount}`

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}

function checkGameOver() {
    if (!gGame.isOn) {

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {

                gBoard[i][j].isShow = true
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                // console.log('cells: ', elCell)
                elCell.classList.remove('hide')
                if (gBoard[i][j].isMine) elCell.classList.add('bomb')

            }
        }
        alert('Game Over :(')
        var smile = document.querySelector('.reset')
        smile.innerText = '🤯'
        clearInterval(gTimeInterval)
    }

    if (gGame.shownCount === gGame.maxShown - gGame.maxMines) {

        alert('YOU ARE WINNER!')
        var smile = document.querySelector('.reset')
        smile.innerText = '🤯'
        clearInterval(gTimeInterval)

    }
}


function updateClock() {
    const endTime = Date.now()
    var elTimer = document.querySelector('.timer')
    gTimer = Math.floor((endTime - gStartTime) / 1000)
    elTimer.innerText = gTimer + ' sec'
}


// onclick function:
// -------------------------------------------------------

function cellClicked(elBtn, i, j) {
    if (gBoard[i][j].isShow) return
    if (gGame.shownCount === 0 && gGame.markedCount === 0) {
        gStartTime = Date.now()
        gTimeInterval = setInterval(updateClock, 1000)
    }


    // console.log('elBtn: ', elBtn)
    // console.log('i: ', i)
    // console.log('j: ', j)
    // console.log('elBtn.innerText: ', elBtn.innerText)

    if (elBtn.innerText === '') {
        setNegsShow(gBoard, i, j)
    } else {
        gBoard[i][j].isShow = true
        elBtn.classList.remove('hide')
        gGame.shownCount++

    }
    if (gBoard[i][j].isMine) {
        elBtn.innerText = BOMB
        gGame.isOn = false

    }
    // console.log(' gBoard[i][j].isShow: ', gBoard[i][j].isShow)

    console.log('gGame.shownCount: ', gGame.shownCount)
    console.log('gGame.maxShown: ', gGame.maxShown)

    checkGameOver()
}


function setNegsShow(board, rowIdx, colIdx) {
    var minesAroundCount = 0
    // console.log('board.length: ', board.length)
    // console.log('rowIdx: ', rowIdx)
    // console.log('colIdx: ', colIdx)
    // console.log('board[rowIdx][colIdx]: ', board[rowIdx][colIdx].isMine)

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // console.log('board.length: ', board[i].length)
            if (j < 0 || j >= board[i].length) continue
            if( board[i][j].isShow) continue
            var currCell = board[i][j]
            board[i][j].isShow = true
            gGame.shownCount++
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.remove('hide')

        }
    }
    // console.log('minesAroundCount: ', minesAroundCount)
    return minesAroundCount
}


// var td = document.querySelector('td')
// td.addEventListener('contextmenu', cellMarked)

function cellMarked(event, elBtn, i, j) {
    event.preventDefault();
    if (gBoard[i][j].isShow) return
    // // console.log('elBtn: ', elBtn)
    // console.log('i: ', i)
    // console.log('j: ', j)

    console.log(gBoard[i][j].isMarked)

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked

    if (gBoard[i][j].isMarked) {
        // if (gGame.markedCount = gGame.maxMarked) return
        gGame.markedCount++
        console.log('gGame.markedCount: ', gGame.markedCount)

        elBtn.innerText = FLAG
        elBtn.classList.remove('hide')

    }
    if (!gBoard[i][j].isMarked) {
        gGame.markedCount--
        console.log('gGame.markedCount: ', gGame.markedCount)
        elBtn.classList.add('hide')
    }

    // var gGame = {
    //     isOn: false,
    //     shownCount: 0,
    //     markedCount: 0,
    //     secsPassed: 0,
    //     maxMarked: 2,
    //     maxShown: 16,
    // }
    //     console.log('gGame.markedCount: ', gGame.markedCount)

    //     console.log('gBoard[i][j].isMarked', gBoard[i][j].isMarked)
}
