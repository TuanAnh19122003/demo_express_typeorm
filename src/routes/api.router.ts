import express, { Express, Request,Response, Router } from "express";
import UserAPIController from "@controllers/api/user.api.controller";

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    UserAPIController.getAllUsers(req, res);
});
router.post('/users/create', (req: Request, res: Response) => {
    UserAPIController.createUser(req, res);
});

router.put('/users/:id/edit', (req: Request, res: Response) => {
    UserAPIController.editUser(req, res);
});
router.patch('/users/:id/edit', (req: Request, res: Response) => {
    UserAPIController.editUser(req, res);
});

router.delete('/users/:id/delete', (req: Request, res: Response) => {
    UserAPIController.deleteUser(req, res);
});

export default router;