
const  jsonwebtoken = require('jsonwebtoken');

module.exports  = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonwebtoken.verify(token, 'RANDOM_TOKEN_SECRET');
        const userID = decodedToken.userId;
        
        if (req.body.userId && req.body.userId != userID) {
            throw 'User ID Not Valid'
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json( {error: error | 'Request Non Authorized !'})
    }
}