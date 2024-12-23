const adminAuth = (req, res, next) => {
    const token = 'xyz';
    const isAdminAuthorised = token === 'xyz'
    if(!isAdminAuthorised) {
        res.status(401).send('Admin is not authorised')
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = 'xyz22';
    const isAdminAuthorised = token === 'xyz'
    if(!isAdminAuthorised) {
        res.status(401).send('User is not authorised')
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}