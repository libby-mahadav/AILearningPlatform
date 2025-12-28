import * as categoryController from '../controllers/categoryController';
import { Router } from 'express';

const router = Router();

 router.post('/',categoryController.addCategory);

router.get('/getAllCategories',categoryController.getAllCategories);

//router.delete('/deleteCategory', categoryController.deleteCategory);
export default router;