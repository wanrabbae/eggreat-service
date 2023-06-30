import moment from 'moment-timezone'
import bcrypt from 'bcrypt'

function getMoment() {
    return moment().locale('id').tz('Asia/Jakarta')
}

async function hashPassword(pw) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pw, salt);
    return hashedPassword
}

function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export {
    getMoment, randomNumber, hashPassword
}