const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'you are not authorized to view this resources. may be u are not logged it yet.' })
}
const isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_member) {
        return next()
    }
    res.status(401).json({ message: 'you are not authorized to view this resources. may be u are not member yet.' })
}
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
        return next()
    }
    res.status(401).json({ message: 'you are not authorized to view this resources. may be u are not admin yet.' })
}

module.exports = { isLoggedIn, isAdmin, isMember }