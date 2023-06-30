const jwt = require('jsonwebtoken')

export default verify = async (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        return res.errorUnauthorized("Unauthorized")
    }
    try {
        const token = header.split(' ')
        const verified = jwt.verify(token[1], process.env.JWT_SECRET)
        req.account = verified

        return next()
    } catch (err) {
        return res.errorUnauthorized("Unauthorized")
    }
}
