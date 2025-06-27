import jwt from 'jsonwebtoken';
import { secrets } from '../config.js';

const authMiddleware = (allowedRoles = []) => (req, res, next) => {
    const token = req.headers.token;
    if(!token) return res.status(401).json({error: "Missing Token"});
    let decoded;
    for(const role of Object.keys(secrets)){
        try{
            decoded = jwt.verify(token, secrets[role]);
            break;
        }catch{
            continue;
        }
    }
    if(!decoded) return res.status(401).json({error: "Invalid Token"});
    if(allowedRoles.length && !allowedRoles.includes(decoded.role)){
        return res.status(403).json({error: "Access Denied"});
    }
    req.user = decoded;
    next();
};
export { authMiddleware };