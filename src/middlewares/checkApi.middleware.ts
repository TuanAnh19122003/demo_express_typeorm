import { NextFunction, Express, Request, Response, response } from "express";

export const checkAPPkey = (req: Request, res: Response, next: NextFunction) =>{
    console.log('Checking App key')
    const appKey = req.query.appid;
    if(!appKey){
        res.json({ status: 401, message:'Missing app key' })
    }else{
        if(appKey != '1234'){
            res.json({ status: 403, message: 'Invalid app key' })
        }else{
            next();
        }
    }
    
}