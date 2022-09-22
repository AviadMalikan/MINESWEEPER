'use strict'

function createMine(board) {

    var mine
    var rowIdx = getRandomIntInclusive(0, board.length - 1)
    var colIdx = getRandomIntInclusive(0, board[0].length - 1)
    // console.log('rowIdx: ', rowIdx)
    // console.log('colIdx: ', colIdx)


    var mine = board[rowIdx][colIdx]
    mine.isMine = true

}

function createRandomMines(board) {
    // console.log('gLevel.Mines: ', gLevel.mines)
    var counter = 0
    for (var i = 0; i <= gLevel.mines - 1; i++) {
        counter++
        createMine(board)
        // console.log('counter:------------------ ', counter)
    }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
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
            if (i === rowIdx && j === colIdx) continue

            // console.log('board[i][j].isMine: ', board[i][j].isMine)
            var currCell = board[i][j]
            if (board[i][j].isMine) minesAroundCount++

        }
    }

    // console.log('minesAroundCount: ', minesAroundCount)

    return minesAroundCount
}

