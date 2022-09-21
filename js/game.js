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
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    maxMarkedCount: 2,
    maxShownCount: 16,
}

// Activate function:
// -------------------------------------------------------
function init() {

    console.log(gGame.maxMarkedCount)
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function resetGame() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    init()
}

// function:
// -------------------------------------------------------
function setDifficult(diff, mines) {
    gLevel.size = diff
    gLevel.mines = mines
    // gGame.maxShownCount = 

    resetGame()
    init()
}

function buildBoard() {
    var board = []
    //create the mat
    board = createMat(gLevel.size ** 0.5, gLevel.size ** 0.5)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = {
                minesAroundCount: setMinesNegsCount(board, i, j),
                isShow: false,
                isMine: false,
                isMarked: false,
            }
        }
    }


    // board[1][1].isMine = true
    // board[1][1].minesAroundCount = 2
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
            if (currCell.isShow === false) cellClass += ' hide'

            cellClass += ''

            strHTML += `\t<td class="cell ${cellClass} hide"
             onclick="cellClicked(this,${i},${j})"
             onmouseup="cellMarked(this,${i},${j})">
          
            ${board[i][j].minesAroundCount}`

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}


function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (var j = colIdx; j <= colIdx; j++) {
            // var currCell = board[i][j]
            if (board[rowIdx][colIdx].isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function cellClicked(elBtn, i, j) {
    // if (gBoard[i][j].isShow) return

    gBoard[i][j].isShow = true
    gBoard[i][j].isMarked = false
    elBtn.classList.remove('hide')
    elBtn.innerText = setMinesNegsCount(gBoard, i, j)

    gGame.shownCount++
    console.log('gGame.shownCount: ', gGame.shownCount)

}

function cellMarked(elBtn, i, j) {
    if (gBoard[i][j].isShow) return
    if (event.which == 3) {
        document, addEventListener('contextmenu', e => {
            e.preventDefault();
        })

        gBoard[i][j].isMarked = !gBoard[i][j].isMarked




        if (gBoard[i][j].isMarked)
            console.log('before:', gGame.markedCount)
        console.log('maxbefore:', gGame.maxMarkedCount)
        if (gGame.markedCount < gGame.maxMarkedCount) {
            gGame.markedCount++
            console.log('---------')
            console.log('after:', gGame.markedCount)
            console.log('maxAfter:', gGame.maxMarkedCount)
            elBtn.classList.remove('hide')
            elBtn.innerText = FLAG
        }
        if (!gBoard[i][j].isMarked) {
            if (gGame.markedCount > 0) gGame.markedCount--
            elBtn.classList.add('hide')
        }
        
        // console.log('at the end:', gBoard[i][j].isMarked)
        console.log('gGame.markedCount: ', gGame.markedCount)
        console.log('---------')
    }
}
