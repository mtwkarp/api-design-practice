import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, Math.random())
}
export const createJWT = (user) => {
    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET
    )

    return token
}
//middleware
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401)
        res.json({message: 'Not allowed !'})

        return
    }

    const [, token] = bearer.split(' ')

    if(!token) {
        res.status(401)
        res.json({message: 'Not valid token !'})

        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user= user

        next()
    }catch (err) {
        res.status(401)
        res.json({message: err})
    }
}