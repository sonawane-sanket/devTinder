const genericError = (err, req, res, next) => {
    if(err){
        res.status(500).send('Error occured!');
    } else {
        next()
    }
}

module.exports = {
    genericError
}