import jwt from 'jsonwebtoken'

const verifyAdmin = async (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        return res.errorUnauthorized("Unauthorized")
    }
    try {
        const token = header.split(' ')
        const verified = jwt.verify(token[1], process.env.JWT_SECRET)
        req.admin = verified

        return next()
    } catch (err) {
        return res.errorUnauthorized("Unauthorized")
    }
}

export { verifyAdmin }