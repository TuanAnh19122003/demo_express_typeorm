import express, { Express, Request,Response, Router } from "express";
import UserController from "@controllers/userController";
import WeatherController from "@controllers/weatherController";
import { checkAuth } from "src/middlewares/checkAuth";
import { isAdmin } from "src/middlewares/isAdimn.midd";

const router: Router = express.Router();

router.get('/users', checkAuth, (req: Request, res: Response) => {
    UserController.index(req, res);
});
router.get('/home', (req: Request, res: Response) => {
    res.render('index');
});
router.get('/weather', checkAuth, isAdmin, (req: Request, res: Response) => {
    WeatherController.index(req, res)
});
router.get('/register', (req: Request, res: Response) => {
    UserController.showFormRegister(req, res)
});
router.post('/register', (req: Request, res: Response) => {
    UserController.register(req, res);
});
router.get('/login', (req: Request, res: Response) => {
    UserController.showFormLogin(req, res);
});
router.post('/login', (req: Request, res: Response) => {
    UserController.login(req, res)
});
router.get('/logout', (req: Request, res: Response) => {
    UserController.logout(req, res);
});
export default router;