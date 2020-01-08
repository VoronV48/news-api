const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config/properties')

module.exports = (req, res, next) => {
    const isValid = req.headers['authorization']
    if (!isValid) {
        return res.json({
            message: 'Укажите заголовок Authorization и заполните его'
        })
    }
    const token= req.get('Authorization').split(" ")[0];
    if(!token){
        res.status(401).json({ message: 'Неправильный токен'})
    }
    try {
        jwt.verify(token, jwtSecret)
    } catch(e) {
        res.status(401).json({ message: e })
    }

    next();
}
// module.exports = (req, res, next) => {
//     const isValid = req.headers['Authorization'];
  
//     if (!isValid) {
//         return res.json({
//             message: 'Укажите заголовок'
//         })
//     }
//     const authHeader= req.get('Authorization')
//     if(!authHeader){
//         res.status(401).json({ message: 'Введите токен'})
//     }
//     const token = authHeader.replace('')

//     try {
//         jwt.verify(token, jwtSecret)
//     } catch(e) {
//         if (e instanceof jwt.JsonWebTokenError){
//             res.status(401).json({ message: 'Не праильный токен'})
//         }
        
//     }

//     next()
// }
