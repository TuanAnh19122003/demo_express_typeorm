import User from "@entity/User";
import UserService from "@services/userService";
import { Request, Response } from "express";

class UserController{
    static async index(req: Request, res: Response){
        try {
            const users: User[] = await UserService.getAllUsers();
            res.render('index',{ users: users})
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
}

export default UserController;