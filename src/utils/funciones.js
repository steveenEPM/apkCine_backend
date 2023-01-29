const jwt = require('jsonwebtoken')

/**Numero aleatorio Entero */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const verifyJWT = (token) => {
    try {
        var decoded = jwt.verify(token, process.env.jwt);
        return decoded.id
    } catch (err) {
        return undefined
    }
}

module.exports = { getRandomInt,verifyJWT}