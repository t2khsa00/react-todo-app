import jwt from 'jsonwebtoken'
const authorizationRequired = "Authorization Required"
const invalidCredentials = "Invalid Credentials"

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequired
        res.status(401).json({message: authorizationRequired})
    } else {
        try {
        const token = req.headers.authorization
        jwt.verify(token,process.env.JWT_SECRET_KEY)
        next()
        } catch (err) {
            res.statusMessage = invalidCredentials
            res.status(403).json({message: invalidCredentials})

        }
    }
}

export  { auth }