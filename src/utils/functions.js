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

function randomString(length = 16) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }

    return result
}

export {
    getMoment, randomNumber, hashPassword, randomString
}