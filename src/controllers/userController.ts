import User from "@entity/User";
import UserService from "@services/userService";
import { Request, Response } from "express";

class UserController{
    static async index(req: Request, res: Response){
        try {
            const users: User[] = await UserService.getAllUsers();
            //Create cookie
            res.cookie('name', 'John Doe', {maxAge: 900000, httpOnly: true});
            res.render('index',{ users: users})
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    static async showFormRegister(req: Request, res: Response){
        res.render('auth/register')
    }

    static async register(req: Request, res: Response){
        await UserService.createUser(req.body)
        res.cookie('email', req.body.email, {maxAge: 900000, httpOnly: true})
        res.redirect('/login')
    }

    static async showFormLogin(req: Request, res: Response){
        const { email, error } = req.cookies         
        res.render('auth/login',{ email: email, error: error })
    }
    
    static async login(req: any, res: Response) {
        const user: any = await UserService.getAccountByEmail(req.body)
        console.log(user);
        if (user) {
            // luu lai session login
            req.session.regenerate(function (err: any) {
                if (err) {
                    console.log(err);
                    return;
                }
            
                // store user information in session, typically a user id
                req.session.userIdLogin = user.id;
                req.session.userLogin = user;
                
                req.session.save(function (err: any) {
                    if (err) return;
                    res.redirect('/home')
                })
            })
        } else {
            // tao cookie error
            res.cookie('errorLogin', 'Invalid email or password', { maxAge: 1000, httpOnly: true });
            res.redirect('/login');
        }
    }

    static logout(req: any, res: Response) {
        req.session.userIdLogin = null;
        req.session.save(function (err: any) {
            if (err) return;

            req.session.regenerate(function (err: any) {
              if (err) return;
              res.redirect('/login')
            })
        })
    }
}

export default UserController;