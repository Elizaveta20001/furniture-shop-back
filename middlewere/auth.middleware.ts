import jwt from 'jsonwebtoken';
import config from 'config';
import { Response, NextFunction} from 'express';


module.exports = (req: any, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS'){
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({message: 'no authorization'});
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (e){
        res.status(401).json({message: 'no authorization'});
    }
};