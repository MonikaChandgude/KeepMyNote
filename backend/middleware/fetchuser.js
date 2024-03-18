var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynamem$ona';

const fetchuser=(req, res, next)=>{
// Get the user from jwt token abd add id to req
   
    const token = req.header('auth-token');
    if(!token){
     res.status(401).send({error: "Plase authenticate with valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
       res.status(401).send({error: "Plase authenticate with valid token"}) 
    }
   
}
module.exports = fetchuser;