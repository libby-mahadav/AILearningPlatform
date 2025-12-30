import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../utils/validators';

const router = Router();
router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/', userController.getAllUsers);
export default router;