import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.json({
            message: "Authorization header missing"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, "I-computers-54")
        req.user = decoded
        next()
    } catch (err) {
        return res.json({
            message: "Invalid or expired token"
        })
    }
}

export function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            })
        }
        next()
    }
}
