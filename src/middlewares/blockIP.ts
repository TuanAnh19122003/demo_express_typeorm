import { NextFunction, Express, Request, Response } from "express";
const listIPBlock: string[] = ["192.168.1.2"]
export const blockIP = (req: Request, res: Response, next: NextFunction) =>{
    const ipClient: string = req.ip as string;
    if(listIPBlock.includes(ipClient)){
        res.status(403).json({ status: 403, message:'Block'})
    }else{
        console.log(ipClient);
        next();
    }
}