import express, { Express, Request,Response, Router } from "express";
import UserController from "@controllers/userController";

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    UserController.index(req, res);
});

export default router;