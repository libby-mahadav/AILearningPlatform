import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { validate } from '../middlewares/validationMiddleware';
import { categorySchema } from '../utils/validators';

const router = Router();
router.post('/addCategory', validate(categorySchema), categoryController.addCategory);
router.get('/getAllCategories', categoryController.getAllCategories);
export default router;