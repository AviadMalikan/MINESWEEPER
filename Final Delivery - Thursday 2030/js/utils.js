'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}



function getRandomIntInclusive(min, max) { // inClusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}


