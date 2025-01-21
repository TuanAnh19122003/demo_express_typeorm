import express, { Express, Request,Response, Router } from "express";
import UserAPIController from "@controllers/api/user.api.controller";

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    UserAPIController.getAllUsers(req, res);
});
// router.get('/users/create', (req: Request, res: Response) => {
//     UserAPIController.createUserForm(req, res);
// });

router.post('/users/create', (req: Request, res: Response) => {
    UserAPIController.createUser(req, res);
});
// router.get('/users/:id/edit', (req: Request, res: Response) => {
//     UserAPIController.editUserForm(req, res);
// });
router.put('/users/:id/edit', (req: Request, res: Response) => {
    UserAPIController.editUser(req, res);
});
router.patch('/users/:id/edit', (req: Request, res: Response) => {
    UserAPIController.editUser(req, res);
});
// router.post('/users/:id/edit', (req: Request, res: Response) => {
//     UserAPIController.editUser(req, res);
// });

router.get('/users/:id/delete', (req: Request, res: Response) => {
    UserAPIController.deleteUser(req, res);
});

router.delete('/users/:id/delete', (req: Request, res: Response) => {
    UserAPIController.deleteUser(req, res);
});

export default router;