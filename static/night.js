const log = function() {
    console.log(...arguments)
}

const move = function(nearBlockNum, spacePos) {
    const sp = spacePos
    const nearBlockClass = '.p' + String(nearBlockNum)
    const b = document.querySelector(nearBlockClass)
    b.classList = ['p' + String(sp)]
    const night = document.querySelector('night')
    night.dataset.spacepos = nearBlockNum
}

const spacePos = function() {
    const night = document.querySelector('night')
    const pos = night.dataset.spacepos
    return Number(pos)
}

const left = function() {
    const tooRight = [3, 6, 9]
    const sp = spacePos()
    if (tooRight.includes(sp)) {
        return
    } else {
        const nearBlockNum = sp + 1
        move(nearBlockNum, sp)
    }
}

const right = function() {
    const tooLeft = [1, 4, 7]
    const sp = spacePos()
    if (tooLeft.includes(sp)) {
        return
    } else {
        const nearBlockNum = sp - 1
        move(nearBlockNum, sp)
    }
}

const up = function() {
    const canNotUp = [7, 8, 9]
    const sp = spacePos()
    if (canNotUp.includes(sp)) {
        return
    } else {
        const nearBlockNum = sp + 3
        move(nearBlockNum, sp)
        // log('up')
    }
}

const down = function() {
    const canNotDown = [1, 2, 3]
    const sp = spacePos()
    if (canNotDown.includes(sp)) {
        return
    } else {
        const nearBlockNum = sp - 3
        move(nearBlockNum, sp)
    }
}

const goodPos = function(one) {
    const currentPos = one.classList[0].slice(1)
    return currentPos === one.innerText
}

const win = function() {
    const allOne = document.querySelectorAll('one')
    const status = _.filter(allOne, one => goodPos(one))
    if (status.length > 7) {
        setTimeout(function(){
            alert('You win!')
            window.location.reload()
        }, 200)
    }
}

const bindEvent = function() {
    // $(window).keydown(function(event){
    window.addEventListener('keydown', function(event){
        // log(event)
        const e = event
        if (e.keyCode === 37) {
            // log('left')
            left()
        } else if (e.keyCode === 39) {
            // log('right')
            right()
        } else if (e.keyCode === 38) {
            // log('up')
            up()
        } else if (e.keyCode === 40){
            // log('down')
            down()
        } else {
            log(e)
        }
        win()
    })
}

const randomMove = function() {
    // const arr = _.range(100)
    // down()
    // right()
    // up()
    // right()
    // down()
    // left()
    // const arr = [1, 2, 3]
    var directArr = []
    // return _.shuffle(arr)
    for (let i = 0; i < 10; i++) {
        for (let i = 0; i < 10; i++) {
            directArr.push(_.random(0, 1))
        }
        for (let i = 0; i < 10; i++) {
            directArr.push(_.random(1, 2))
        }
        for (let i = 0; i < 10; i++) {
            directArr.push(_.random(2, 3))
        }
        // directArr = directArr.concat(_.shuffle(arr))
    }
    for (let i = 0; i < 10; i++) {
        directArr.push(_.random(0, 1))
    }
    const o = [
        up,
        left,
        down,
        right,
    ]
    log(directArr)
    directArr.forEach(d => o[d]())
}

const insertNum = function(one, num) {
    one.innerText = num
}

const initBlock = function() {
    const allOne = document.querySelectorAll('one')
    // const randArr = _.shuffle(_.range(1, 9))
    // allOne.forEach((one, i) => insertNum(one, randArr[i]))
    allOne.forEach((one, i) => insertNum(one, i+1))
    randomMove()
}

const main = function() {
    initBlock()
    bindEvent()
}
// log(_.shuffle([1, 2, 3, 4]))
main()
