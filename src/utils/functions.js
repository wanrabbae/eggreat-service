import moment from 'moment-timezone'

function getMoment() {
    return moment().locale('id').tz('Asia/Jakarta')
}

function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export {
    getMoment, randomNumber
}