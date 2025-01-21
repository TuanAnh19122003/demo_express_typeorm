import express, { Express, Request,Response, Router } from "express";
import UserController from "@controllers/userController";
import WeatherController from "@controllers/weatherController";

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    UserController.index(req, res);
});
router.get('/home', (req: Request, res: Response) => {
    res.render('index');
});
router.get('/weather', (req: Request, res: Response) => {
    WeatherController.index(req, res)
});

export default router;