import UserService from "@services/userService";
import { Request, Response } from "express";
import User from "@entity/User";

class UserAPIController {
    static async getAllUsers(req: Request, res: Response){
        try {
            const users: User[] = await UserService.getAllUsers();
            const data = {
                "cod":200,
                "data":users
            }
            res.json(data);
        } catch (error) {
            const data = {
                "cod":500,
                "message":"Server Not"
            }
            res.json(data);
        }
    }
    static async createUser(req: Request, res: Response){
        try {
            const user = await UserService.createUser(req.body);
            const data = {
                "cod":201,
                "message":"User created",
                "data":user
            }
            res.json(data);
        } catch (error) {
            const data = {
                "cod":500,
                "message":"Internal Server Error",
            }
            res.json(data);
        }
    }

    static async updateUser(req: Request, res: Response){
        try {
            const id = req.params.id;
            const method = req.method;
            const user = await UserService.updateUser(Number(id), req.body, method);
            const data = {
                "cod":200,
                "message":"User updated",
                "data":user
            }
            res.json(data);
        } catch (error) {
            const data = {
                "cod":500,
                "message":"Internal Server Error",
            }
            res.json(data);
        }
    }

    static async deleteUser(req: Request, res: Response){
        try {
            const id = req.params.id;
            await UserService.deleteUser(Number(id));
            const data = {
                "cod":200,
                "message":"User deleted"
            }
            res.json(data);
        } catch (error) {
            const data = {
                "cod":500,
                "message":"Internal Server Error",
            }
            res.json(data);
        }
    }
}

export default UserAPIController;