import { NextFunction, Response } from "express";

export const isAdmin = ( req: any, res: Response, next: NextFunction ) =>{
    const { userLogin } = req.session;
    const currentRoleID = userLogin.role.id;
    if(currentRoleID == 1){
        next();
    } else {
        res.status(403).json({ status: 403, message: 'Unauthorized' });
    }
}